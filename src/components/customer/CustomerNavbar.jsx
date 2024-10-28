import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
// Importamos la imagen correctamente
import logo from '../../assets/images/logo/logo.jpg';

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
      <div className="container">
        {/* Logo - Reemplazamos el texto "Cafetería" con la imagen */}
        <Link className="navbar-brand" to="/customer/combos">
          <img src={logo} alt="Cafetería logo" style={{ height: '50px' }} />
        </Link>

        {/* Toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Centered nav links */}
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/customer/combos">Combos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/favorites">Favoritos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer/purchase-history">Historial de Compras</Link>
            </li>
          </ul>

          {/* User info and logout button */}
          {store.customer ? (
            <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
              <span className="navbar-text mb-2 mb-lg-0 me-lg-3">Hola, {store.customer.name}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-3 mt-lg-0">
              <Link className="btn btn-outline-primary" to="/customer-login">Iniciar sesión</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
