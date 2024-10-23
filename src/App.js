import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import injectContext, { Context } from './store/context';
import Products from './views/merchandise/Products';
import Favorites from './views/customer/Favorites';
import PurchaseHistory from './views/customer/PurchaseHistory';
import Combos from './views/merchandise/Combos';
import CustomerNavbar from './components/customer/CustomerNavbar';
import ManagerLoginView from './views/manager/login/ManagerLoginView';
import Home from './views/home/Home';
import CustomerLoginView from './views/customer/CustomerLoginView';

function App() {
  const { store } = React.useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
  }, [store.token, navigate]);

  return (
    <>
      {store.token && <CustomerNavbar />}  {/* Solo mostrar la navbar si está logueado */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<CustomerLoginView />} />
        <Route path='/combos' element={<Combos />} />
        <Route path='/products' element={<Products />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/purchase-history' element={<PurchaseHistory />} />
        <Route path='/manager-login' element={<ManagerLoginView />} />


      </Routes>
    </>
  );
}

export default injectContext(App);
