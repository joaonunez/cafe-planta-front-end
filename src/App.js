import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import injectContext, { Context } from './store/context';
import Home from './views/home/Home';
import CustomerLoginView from './views/customer/CustomerLoginView';
import CustomerRegisterView from './views/customer/CustomerRegisterView';
import ManagerLoginView from './views/manager/login/ManagerLoginView';
import CustomerHome from './views/customer/CustomerHome'; // Importar la nueva vista

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  // Redirige solo cuando se intenta acceder a rutas protegidas sin autenticación
  useEffect(() => {
    if (!store.token && window.location.pathname.startsWith("/customer")) {
      navigate('/login'); // Redirige a login si intenta acceder a rutas protegidas sin token
    }
  }, [store.token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<CustomerLoginView />} />
      <Route path="/register" element={<CustomerRegisterView />} />
      <Route path="/manager-login" element={<ManagerLoginView />} />
      
      {/* Agrupar rutas de cliente bajo CustomerHome */}
      <Route path="/customer/*" element={<CustomerHome />} />
    </Routes>
  );
}

export default injectContext(App);
