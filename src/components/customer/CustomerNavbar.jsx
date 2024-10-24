import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

const CustomerNavbar = () => {
  const { store, actions } = React.useContext(Context);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    actions.logoutCustomer();
    navigate("/login");
    window.location.reload(); // Refresca la página para actualizar la memoria
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/combos">Cafetería</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/combos">Combos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favoritos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/purchase-history">Historial de Compras</Link>
            </li>
          </ul>
          {store.user ? (
            <div className="d-flex">
              <span className="navbar-text me-3">Hola, {store.user.name}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <Link className="btn btn-outline-primary" to="/customer-login">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
