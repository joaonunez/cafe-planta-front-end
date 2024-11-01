// CustomerOrder.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";

const CustomerOrder = () => {
  const { store, actions } = useContext(Context);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const latestOrder = await actions.getLatestOrder();
      setOrder(latestOrder);
    };
    fetchOrder();
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Detalles de tu Pedido</h2>
      <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
      <p><strong>Total:</strong> ${order.total_amount.toLocaleString("es-CL")}</p>
      <p><strong>Estado:</strong> {order.status}</p>
      <p><strong>Comentarios:</strong> {order.comments || "Ninguno"}</p>

      <h3>Detalles de los Items</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.quantity}x {item.name} - ${item.unit_price.toLocaleString("es-CL")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrder;
