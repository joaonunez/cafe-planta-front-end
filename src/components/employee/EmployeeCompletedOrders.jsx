import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/context';

const EmployeeCompletedOrders = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchCompletedOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Ventas Realizadas</h2>
      <div className="row">
        {store.completedOrders.map(order => (
          <div key={order.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">ID de Pedido: {order.id}</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>🧑‍🤝‍🧑 Cliente:</strong> {order.customer_name || "Sin asignar"}
                  </li>
                  <li className="list-group-item">
                    <strong>🍽️ Mesa:</strong> {order.dining_area_number || "Sin asignar"}
                  </li>
                  <li className="list-group-item">
                    <strong>☕ Cafetería:</strong> {order.cafe_name || "Sin asignar"}
                  </li>
                  <li className="list-group-item">
                    <strong>🕒 Fecha:</strong> {order.date}
                  </li>
                  <li className="list-group-item">
                    <strong>💵 Monto Total:</strong> ${order.total_amount.toLocaleString("es-CL")}
                  </li>
                  <li className="list-group-item">
                    <strong>✍️ Comentarios:</strong> {order.comments || "Sin comentarios"}
                  </li>
                  <li className="list-group-item">
                    <strong>📦 Estado:</strong> 
                    <span className="badge bg-success ms-2">{order.status}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCompletedOrders;
