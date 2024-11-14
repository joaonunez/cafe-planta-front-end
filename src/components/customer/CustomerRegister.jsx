import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import Swal from 'sweetalert2';

const CustomerRegister = () => {
    const { actions } = useContext(Context);
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateRut = (rut) => {
        const rutRegex = /^[0-9]+-[0-9Kk]$/;
        return rutRegex.test(rut);
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9._-]{5,20}$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateRut(rut)) {
            setErrorMessage('RUT inválido. Debe seguir el formato 12345678-K.');
            return;
        }
        if (!validateName(name)) {
            setErrorMessage('El nombre debe tener entre 3 y 50 letras y solo puede contener espacios y letras.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Correo electrónico inválido.');
            return;
        }
        if (!validateUsername(username)) {
            setErrorMessage('El nombre de usuario debe tener entre 5 y 20 caracteres y solo puede contener letras, números, puntos, guiones y guiones bajos.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
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
            setErrorMessage(message || 'Error en el registro');
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
                    <span className="text-muted" style={{ fontSize: '0.9em' }}> (Para contactarte)</span>
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
                    <span className="text-muted" style={{ fontSize: '0.9em' }}> (Con el que iniciarás sesión)</span>
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
