import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

const AdminLogin = () => {
    const { actions } = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const success = await actions.loginAdmin(username, password);
        if (success) {
            navigate('/admin'); // Redirige al panel de administración después de un login exitoso
        } else {
            setError('Credenciales incorrectas o error en el inicio de sesión.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px', padding: '0 1rem' }}>
            <h2 className="text-center">Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default AdminLogin;
