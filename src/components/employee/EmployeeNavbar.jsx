import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const EmployeeNavbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await actions.logoutEmployee();
    if (success) {
      navigate("/employee-login");
    } else {
      console.error("Error al intentar cerrar sesión.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/employee" className="navbar-brand">Panel Vendedor</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/employee/orders" className="nav-link">Pedidos</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/taken-orders" className="nav-link">Mis Pedidos</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn nav-link text-white d-flex align-items-center">
                <FaSignOutAlt className="me-2" /> Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
