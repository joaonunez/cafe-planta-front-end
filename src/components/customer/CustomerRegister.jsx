import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const CustomerRegister = () => {
    const { actions } = useContext(Context);
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensaje de error al enviar el formulario

        // Llamar a registerCustomer con los datos correctos
        const { success, message } = await actions.registerCustomer({
            rut,
            name,
            email,
            username,
            password,
        });

        if (success) {
            // Mostrar SweetAlert de loading
            Swal.fire({
                title: 'Registrando...',
                text: 'Por favor, espere...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // Simular un delay de 3 segundos
            setTimeout(() => {
                Swal.close(); // Cerrar el loading
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'El usuario ha sido creado correctamente.',
                }).then(() => {
                    navigate("/login"); // Redirigir al login
                });
            }, 3000);
        } else {
            setErrorMessage(message || 'Error en el registro'); // Mostrar mensaje de error si hay uno
        }
    };

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <div className="container mt-5">
            <h2>Registro de Cliente</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mensaje de error */}
            <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rut"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span className="text-muted" style={{ fontSize: '0.9em' }}> (Para contactarte)</span> {/* Descripción del email */}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span className="text-muted" style={{ fontSize: '0.9em' }}> (Con el que iniciarás sesión)</span> {/* Descripción del nombre de usuario */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>
                    Volver
                </button>
            </form>
        </div>
    );
};

export default CustomerRegister;
