// components/employee/EmployeeTakenOrders.js
import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/context';

const EmployeeTakenOrders = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchTakenOrders();
  }, []);

  const handleMarkAsDelivered = (orderId) => {
    actions.markOrderAsDelivered(orderId);
  };

  return (
    <div className="container mt-4">
      <h2>Pedidos Tomados</h2>
      <ul className="list-group">
        {store.takenOrders.map(order => (
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>ID de Pedido: {order.id}</h5>
              <p>Fecha: {new Date(order.date).toLocaleString()}</p>
              <p>Monto Total: ${order.total_amount}</p>
              <p>Comentarios: {order.comments}</p>
              <p>Estado: {order.status}</p>
            </div>
            <button onClick={() => handleMarkAsDelivered(order.id)} className="btn btn-success">
              Marcar como Lista y Entregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTakenOrders;
