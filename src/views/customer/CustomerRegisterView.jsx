import React from 'react';
import CustomerRegister from '../../components/customer/CustomerRegister';


const CustomerRegisterView = () => {
    return (
        <div className="register-view">
            <div className="container mt-5">
                <h1 className="text-center">Registro de Cliente</h1>
                <CustomerRegister />
            </div>
        </div>
    );
};

export default CustomerRegisterView;
