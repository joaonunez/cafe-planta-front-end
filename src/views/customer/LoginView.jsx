import React from 'react';
import LoginForm from '../../components/customer/LoginForm';

const LoginView = () => {
    const handleLogin = (credentials) => {
        // Aquí puedes manejar la lógica de autenticación, por ejemplo:
        // Hacer una llamada a la API con las credenciales.
        console.log('Login credentials:', credentials);
        // Puedes hacer un fetch o axios.post para enviar las credenciales al backend.
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión como Cliente</h2>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default LoginView;
