import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/images/logo/logo.jpg';

const CustomerNavbar = () => {
  const { store, actions } = React.useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await actions.logoutCustomer();
    if (success) {
      navigate("/customer-login"); // Redirige a la página de login de cliente
    } else {
      console.error("Error al intentar cerrar sesión del cliente.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/customer">
          <img src={logo} alt="Cafetería logo" style={{ height: '50px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
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
              <Link className="nav-link" to="/customer/purchase-history">Mis pedidos</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/customer/cart" className="btn btn-outline-primary me-3 d-flex align-items-center">
              <FaShoppingCart size={20} /> {/* Ícono de carrito */}
            </Link>
            {store.customer ? (
              <div className="d-flex flex-column flex-lg-row align-items-center">
                <span className="navbar-text mb-2 mb-lg-0 me-lg-3">Hola, {store.customer.name}</span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            ) : (
              <Link className="btn btn-outline-primary" to="/customer-login">Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
