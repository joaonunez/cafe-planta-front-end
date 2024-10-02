import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import injectContext, { Context } from './store/context';
import Products from './views/merchandise/Products';
import Favorites from './views/customer/Favorites';
import PurchaseHistory from './views/customer/PurchaseHistory';
import Combos from './views/merchandise/Combos';
import CustomerNavbar from './components/customer/CustomerNavbar';
import LoginView from './views/customer/LoginView';

function App() {
  const { store } = React.useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/");
    }
  }, [store.token, navigate]);

  return (
    <>
      {store.token && <CustomerNavbar />}  {/* Solo mostrar la navbar si está logueado */}
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route path='/combos' element={<Combos />} />
        <Route path='/products' element={<Products />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/purchase-history' element={<PurchaseHistory />} />
      </Routes>
    </>
  );
}

export default injectContext(App);
