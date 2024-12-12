// CustomerPurchaseHistory.js
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/context";

const CustomerPurchaseHistory = () => {
  const { actions } = useContext(Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const purchases = await actions.fetchPurchaseHistory();
        setHistory(purchases || []);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };
    fetchHistory();
  }, [actions]);

  if (!history || history.length === 0) {
    return <p className="loading-text">No tienes compras anteriores.</p>;
  }

  return (
    <div className="customer-history-container">
      <h2 className="history-title">Historial de Compras Anteriores</h2>
      {history.map((order) => (
        <div key={order.id} className="history-order-card">
          <div className="order-details">
            <h3 className="order-subtitle">Pedido #{order.id}</h3>
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
                    <small>
                      Precio Total: ${(item.quantity * item.unit_price).toLocaleString("es-CL")}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerPurchaseHistory;
