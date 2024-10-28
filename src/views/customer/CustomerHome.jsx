import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import Combos from '../merchandise/Combos';
import Products from '../merchandise/Products';
import Favorites from '../customer/Favorites';
import PurchaseHistory from '../customer/PurchaseHistory';
import CustomerNavbar from '../../components/customer/CustomerNavbar';

const CustomerHome = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate('/login'); // Redirige a login solo si no hay token
    }
  }, [store.token, navigate]);

  return (
    <>
      {store.token && <CustomerNavbar />} {/* Solo mostrar el navbar si está logueado */}
      <div className="container">
        <Routes>
          <Route path="/combos" element={<Combos />} />
          <Route path="/products" element={<Products />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
        </Routes>
      </div>
    </>
  );
};

export default CustomerHome;
