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
    const orderDetails = await actions.fetchOrderDetails(orderId);
    setSelectedOrderDetails(orderDetails);
  };

  const inProgress = store.ordersInProgress || [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pedidos en Progreso</h2>
      <div className="row">
        {inProgress.length > 0 ? (
          inProgress.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">ID de Pedido: {order.id}</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Cliente:</strong> {order.customer_name || "Sin asignar"}
                    </li>
                    <li className="list-group-item">
                      <strong>Mesa:</strong> {order.dining_area_number || "Sin asignar"}
                    </li>
                    <li className="list-group-item">
                      <strong>Cafetería:</strong> {order.cafe_name || "Sin asignar"}
                    </li>
                    <li className="list-group-item">
                      <strong>Fecha:</strong> {order.date}
                    </li>
                    <li className="list-group-item">
                      <strong>Monto Total:</strong> ${order.total_amount?.toLocaleString("es-CL")}
                    </li>
                    <li className="list-group-item">
                      <strong>Comentarios:</strong> {order.comments || "Sin comentarios"}
                    </li>
                  </ul>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button 
                    onClick={() => actions.takeOrder(order.id)} 
                    className="btn btn-success w-50 me-2"
                  >
                    Tomar Orden
                  </button>
                  <button 
                    onClick={() => handleViewDetails(order.id)} 
                    className="btn btn-info w-50"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay pedidos en progreso en este momento</p>
        )}
      </div>

      <ViewOrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        orderDetails={selectedOrderDetails}
      />
    </div>
  );
};

export default EmployeeOrders;
