import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Context } from '../../store/context';
import { FaBoxOpen, FaShoppingBasket } from 'react-icons/fa';
import Combos from '../merchandise/Combos';
import Products from '../merchandise/Products';
import Favorites from '../customer/Favorites';
import PurchaseHistory from '../customer/PurchaseHistory';
import CustomerNavbar from '../../components/customer/CustomerNavbar';
import Cart from '../../components/customer/Cart';

const CustomerHome = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!store.token) {
      navigate('/login'); // Redirige a login solo si no hay token
    }
  }, [store.token, navigate]);

  return (
    <>
      {store.token && <CustomerNavbar />} {/* Solo mostrar el navbar si está logueado */}

      {/* Mostrar mensaje de bienvenida solo en la ruta "/customer" */}
      {location.pathname === "/customer" && store.customer && (
        <div className="container mt-4">
          <div className="text-center mb-4">
            <h2 className="mb-3">¡Bienvenido, {store.customer.name}!</h2>
            <p>Nos alegra verte de nuevo. ¿Qué te gustaría explorar hoy? Puedes echar un vistazo a nuestros combos y productos destacados.</p>
          </div>

          {/* Mini-banner de navegación */}
          <div className="row text-center">
            <div className="col-6">
              <Link to="/customer/combos" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                <FaBoxOpen size={30} />
                <small>Explorar Combos</small>
              </Link>
            </div>
            <div className="col-6">
              <Link to="/customer/products" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                <FaShoppingBasket size={30} />
                <small>Ver Productos</small>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <Routes>
          <Route path="/combos" element={<Combos />} />
          <Route path="/products" element={<Products />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
};

export default CustomerHome;
