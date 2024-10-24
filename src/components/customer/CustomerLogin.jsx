import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado

const CustomerLogin = () => {
  const { actions, store } = React.useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mostrar el SweetAlert de "Iniciando sesión..."
    Swal.fire({
      title: 'Iniciando sesión...',
      text: 'Por favor espera',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.stopTimer();
      }
    });

    // Simular un tiempo de espera de 3 segundos
    setTimeout(async () => {
      const success = await actions.loginCustomer(username, password);
      if (success) {
        navigate("/combos");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: store.error || 'Credenciales inválidas',
        });
      }
    }, 3000);
  };

  const handleGoBack = () => {
    navigate('/'); // Cambiado para redirigir a la ruta raíz
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light"> 
      <div className="col-md-5 col-11 col-xxl-3">
        <div className="card shadow border-0 bg-secondary">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 text-warning">Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light text-dark"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu nombre de usuario"
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg bg-light text-dark"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning btn-lg w-100">Iniciar sesión</button>
            </form>
            
            <div className="mt-4 text-center border-top pt-3">
              <span className="d-block text-muted">¿Aún no estás registrado?</span>
              <button className="btn btn-outline-warning mt-2" onClick={handleRegisterRedirect}>
                Regístrate aquí
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-light btn-lg mt-4 col-xxl-1 col-5" onClick={handleGoBack}>
        Volver Atrás
      </button>
    </div>
  );
};

export default CustomerLogin;
