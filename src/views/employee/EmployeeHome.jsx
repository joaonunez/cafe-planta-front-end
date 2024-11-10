import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import EmployeeNavbar from '../../components/employee/EmployeeNavbar';
import EmployeeOrders from '../../components/employee/EmployeeOrders';
import EmployeeTakenOrders from '../../components/employee/EmployeeTakenOrders ';


const EmployeeHome = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token || store.employee?.role_id !== 3) {
      navigate('/employee-login');
    }
  }, [store.token, store.employee, navigate]);

  return (
    <>
      {store.token && <EmployeeNavbar />}

      <div className="container mt-4 text-center">
        <h2>Bienvenido, Vendedor</h2>
        <p>¿Qué acción deseas realizar hoy?</p>
      </div>

      <Routes>
        <Route path="/orders" element={<EmployeeOrders />} />
        <Route path="/taken-orders" element={<EmployeeTakenOrders />} />
      </Routes>
    </>
  );
};

export default EmployeeHome;
