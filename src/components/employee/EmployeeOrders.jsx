import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import ViewOrderDetailsModal from "./modals/ViewOrderDetailsModal";

const EmployeeOrders = () => {
  const { store, actions } = useContext(Context);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    actions.fetchOrdersInProgress();
  }, []);

  const handleViewDetails = async (orderId) => {
    setModalOpen(true);
    const orderDetails = await actions.fetchOrderDetails(orderId); // Nuevo método en el store
    setSelectedOrderDetails(orderDetails);
  };

  return (
    <div className="container mt-4">
      <h2>Pedidos en Progreso</h2>
      <ul className="list-group">
        {store.ordersInProgress.map((order) => (
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>ID de Pedido: {order.id}</h5>
              <p>Fecha: {new Date(order.date).toLocaleString()}</p>
              <p>Monto Total: ${order.total_amount}</p>
              <p>Comentarios: {order.comments}</p>
            </div>
            <div>
              <button onClick={() => actions.takeOrder(order.id)} className="btn btn-primary me-2">
                Tomar Orden
              </button>
              <button onClick={() => handleViewDetails(order.id)} className="btn btn-secondary">
                Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ViewOrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        orderDetails={selectedOrderDetails}
      />
    </div>
  );
};

export default EmployeeOrders;
