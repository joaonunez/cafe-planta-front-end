// components/employee/EmployeeCompletedOrders.js
import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/context';

const EmployeeCompletedOrders = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchCompletedOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Ventas Realizadas</h2>
      <ul className="list-group">
        {store.completedOrders.map(order => (
          <li key={order.id} className="list-group-item">
            <h5>ID de Pedido: {order.id}</h5>
            <p>Fecha: {new Date(order.date).toLocaleString()}</p>
            <p>Monto Total: ${order.total_amount}</p>
            <p>Comentarios: {order.comments}</p>
            <p>Estado: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeCompletedOrders;
