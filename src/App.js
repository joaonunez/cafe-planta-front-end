import React, { useEffect } from 'react';
import { BrowserRouter as Route, Routes, useNavigate } from 'react-router-dom';
import injectContext, { Context } from './store/context';
import Products from './views/merchandise/Products';
import Favorites from './views/customer/Favorites';
import PurchaseHistory from './views/customer/PurchaseHistory';
import Combos from './views/merchandise/Combos';
import LoginForm from './components/customer/LoginForm';
import CustomerNavbar from './components/customer/CustomerNavbar';

function App() {
  const { store } = React.useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/customer-login");
    }
  }, [store.token, navigate]);

  return (
    <>
      {store.token && <CustomerNavbar />}  {/* Solo mostrar la navbar si está logueado */}
      <Routes>
        <Route path='/customer-login' element={<LoginForm />} />
        <Route path='/combos' element={<Combos />} />
        <Route path='/products' element={<Products />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/purchase-history' element={<PurchaseHistory />} />
      </Routes>
    </>
  );
}

export default injectContext(App);
