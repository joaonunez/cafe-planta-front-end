import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLogin from '../../components/customer/CustomerLogin';

const CustomerLoginView = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <CustomerLogin/>
            
        </div>
    );
};

export default CustomerLoginView;
