import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";

const CustomerOrder = () => {
  const { store, actions } = useContext(Context);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const latestOrder = await actions.getLatestOrder();
      if (latestOrder) {
        const orderDetails = await actions.getOrderDetails(latestOrder.id);
        setOrder({ ...latestOrder, items: orderDetails.items });
      }
    };
    fetchOrder();
  }, [actions]);

  if (!order) {
    return <p className="loading-text">Cargando detalles del pedido...</p>;
  }

  return (
    <div className="customer-order-container">
      <h2 className="order-title">Historial de Compras</h2>
      <div className="order-details">
        <h3 className="order-subtitle">Detalles de tu Pedido</h3>
        <p>
          <strong>Fecha:</strong> {order.date}
        </p>
        <p>
          <strong>Total:</strong> ${order.total_amount.toLocaleString("es-CL")}
        </p>
        <p>
          <strong>Estado:</strong> {order.status}
        </p>
        <p>
          <strong>Comentarios:</strong> {order.comments || "Ninguno"}
        </p>
      </div>

      <div className="order-items">
        <h3 className="order-subtitle">Detalles de los Ítems</h3>
        <ul className="item-list">
          {order.items.map((item, index) => (
            <li key={index} className="item-card">
              <img
                src={item.image_url || "/path-to-default-image.jpg"}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <h5>{item.name}</h5>
                <p>
                  {item.quantity} x ${item.unit_price.toLocaleString("es-CL")}
                </p>
                <small>Precio: ${(item.quantity * item.unit_price).toLocaleString("es-CL")}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerOrder;
