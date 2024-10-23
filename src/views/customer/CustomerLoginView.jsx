import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLogin from '../../components/customer/CustomerLogin';

const CustomerLoginView = () => {
    const navigate = useNavigate();  
    const handleGoBack = () => {
        navigate(-1);  
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión como Cliente</h2>
            <CustomerLogin/>
            <button className="btn btn-secondary mt-3" onClick={handleGoBack}>
                Volver Atrás
            </button>
        </div>
    );
};

export default CustomerLoginView;
