import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

const LoginForm = () => {
  const { actions, store } = React.useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await actions.login(username, password);
    if (success) {
      navigate("/combos");  // Redirigir después de iniciar sesión
    } else {
      alert(store.error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4 col-10">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
