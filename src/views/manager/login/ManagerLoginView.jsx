// src/LoginPage.js
import React from 'react';
import ManagerLogin from '../../../components/manager/ManagerLogin';

const ManagerLoginView = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1 className='text-center'>Bienvenido Gerente por favor inicia sesion</h1>
            <ManagerLogin />
        </div>
    );
};

export default ManagerLoginView;
