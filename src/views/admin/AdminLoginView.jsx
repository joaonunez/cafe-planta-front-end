import React from 'react';
import AdminLogin from '../../components/admin/AdminLogin'; // Corrige el path si es necesario

const AdminLoginView = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', padding: '0 1rem' }}>
            <h1 className='text-center mb-4'>Bienvenido Administrador, por favor inicia sesión</h1>
            <AdminLogin />
        </div>
    );
};

export default AdminLoginView;
