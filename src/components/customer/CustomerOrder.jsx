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
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Historial de Compras</h2>
      <h3>Detalles de tu Pedido</h3>
      <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
      <p><strong>Total:</strong> ${order.total_amount.toLocaleString("es-CL")}</p>
      <p><strong>Estado:</strong> {order.status}</p>
      <p><strong>Comentarios:</strong> {order.comments || "Ninguno"}</p>

      <h3>Detalles de los Items</h3>
      <ul className="list-group">
        {order.items.map((item, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <img
              src={item.image_url || "/path-to-default-image.jpg"}
              alt={item.name}
              className="img-thumbnail me-3"
              style={{ width: "60px", height: "60px" }}
            />
            <div>
              <h5 className="mb-1">{item.name}</h5>
              <p className="mb-1">
                {item.quantity} x ${item.unit_price.toLocaleString("es-CL")}
              </p>
              <small>Total: ${(item.quantity * item.unit_price).toLocaleString("es-CL")}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrder;
