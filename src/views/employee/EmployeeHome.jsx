// EmployeeHome.js
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Context } from '../../store/context';
import EmployeeNavbar from '../../components/employee/EmployeeNavbar';
import EmployeeOrders from '../../components/employee/EmployeeOrders';
import EmployeeCompletedOrders from '../../components/employee/EmployeeCompletedOrders';
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
        
        {/* Botones de navegación rápidos */}
        <div className="d-flex justify-content-center flex-wrap mt-4">
          <Link to="/employee/orders" className="btn btn-primary m-2">
            Ver Pedidos en Progreso
          </Link>
          <Link to="/employee/taken-orders" className="btn btn-success m-2">
            Ver Pedidos Tomados
          </Link>
          <Link to="/employee/completed-orders" className="btn btn-info m-2">
            Ver Pedidos Completados
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/orders" element={<EmployeeOrders />} />
        <Route path="/taken-orders" element={<EmployeeTakenOrders />} />
        <Route path="/completed-orders" element={<EmployeeCompletedOrders />} />
      </Routes>
    </>
  );
};

export default EmployeeHome;
