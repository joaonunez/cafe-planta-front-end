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
    const [errorMessage, setErrorMessage] = useState(''); // Mensaje general de error
    const [serverErrors, setServerErrors] = useState({}); // Errores específicos del servidor
    const navigate = useNavigate();

    // Validaciones de los campos
    const validateRut = (rut) => /^[0-9]{7,8}-[0-9Kk]$/.test(rut); // Formato RUT (ejemplo: 12345678-9)
    const validateName = (name) => name.length >= 3; // Mínimo 3 caracteres
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); // Formato de correo válido
    const validateUsername = (username) => username.length >= 4; // Mínimo 4 caracteres
    const validatePassword = (password) => password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password); // Mínimo 8 caracteres, una mayúscula y un número

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensaje de error general
        setServerErrors({}); // Limpiar errores específicos

        if (!validateRut(rut)) {
            setErrorMessage('El RUT no es válido. Formato esperado: 12345678-9');
            return;
        }

        if (!validateName(name)) {
            setErrorMessage('El nombre debe tener al menos 3 caracteres.');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('El formato del correo electrónico no es válido.');
            return;
        }

        if (!validateUsername(username)) {
            setErrorMessage('El nombre de usuario debe tener al menos 4 caracteres.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.');
            return;
        }

        const { success, message } = await actions.registerCustomer({
            rut,
            name,
            email,
            username,
            password,
        });

        if (success) {
            Swal.fire({
                title: 'Registrando...',
                text: 'Por favor, espere...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            setTimeout(() => {
                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'El usuario ha sido creado correctamente.',
                }).then(() => {
                    navigate("/login");
                });
            }, 3000);
        } else {
            if (typeof message === 'object' && message.error) {
                setErrorMessage(message.error);
                setServerErrors(message); // Almacenar errores específicos
            } else {
                setErrorMessage(message || 'Error en el registro');
            }
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <h2>Registro de Cliente</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT</label>
                    <input
                        type="text"
                        className={`form-control ${serverErrors.error && serverErrors.error.includes('RUT') ? 'is-invalid' : ''}`}
                        id="rut"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                    />
                    {serverErrors.error && serverErrors.error.includes('RUT') && (
                        <div className="invalid-feedback">{serverErrors.error}</div>
                    )}
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
                        className={`form-control ${serverErrors.error && serverErrors.error.includes('Email') ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {serverErrors.error && serverErrors.error.includes('Email') && (
                        <div className="invalid-feedback">{serverErrors.error}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className={`form-control ${serverErrors.error && serverErrors.error.includes('Username') ? 'is-invalid' : ''}`}
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {serverErrors.error && serverErrors.error.includes('Username') && (
                        <div className="invalid-feedback">{serverErrors.error}</div>
                    )}
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
