import React, { useState, useEffect } from "react";


const ViewOrderDetailsModal = ({ isOpen, onClose, orderDetails }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true); // Mostramos el spinner al abrir el modal
    }
  }, [isOpen]);

  useEffect(() => {
    if (orderDetails) {
      const timer = setTimeout(() => setLoading(false), 300); // Simulamos un tiempo de carga
      return () => clearTimeout(timer); // Limpiamos el temporizador al desmontar
    }
  }, [orderDetails]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Detalles del Pedido</h2>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Cargando detalles...</p>
          </div>
        ) : (
          <div>
            <p><strong>ID Pedido:</strong> {orderDetails.order_id}</p>
            <p><strong>Fecha:</strong> {new Date(orderDetails.date).toLocaleString()}</p>
            <p><strong>Comentarios:</strong> {orderDetails.comments || "Ninguno"}</p>
            <ul className="order-items-list">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="item-card">
                  <img
                    src={item.image_url || "/path-to-default-image.jpg"}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h5>{item.name}</h5>
                    <p>{item.quantity} x ${item.unit_price.toLocaleString("es-CL")}</p>
                    <small>Total: ${(item.quantity * item.unit_price).toLocaleString("es-CL")}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrderDetailsModal;
