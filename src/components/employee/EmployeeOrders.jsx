// components/employee/EmployeeOrders.js
import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/context';

const EmployeeOrders = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchOrdersInProgress();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pedidos en Progreso</h2>
      <ul className="list-group">
        {store.ordersInProgress.map(order => (
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>ID de Pedido: {order.id}</h5>
              <p>Fecha: {new Date(order.date).toLocaleString()}</p>
              <p>Monto Total: ${order.total_amount}</p>
              <p>Comentarios: {order.comments}</p>
            </div>
            <button onClick={() => actions.takeOrder(order.id)} className="btn btn-primary">
              Tomar Orden
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeOrders;
