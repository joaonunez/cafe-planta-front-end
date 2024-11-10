// views/employee/EmployeeLoginView.jsx
import React from 'react';
import EmployeeLogin from '../../components/employee/EmployeeLogin';

const EmployeeLoginView = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Bienvenido, Vendedor</h2>
      <EmployeeLogin />
    </div>
  );
};

export default EmployeeLoginView;
