import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

const SaleDetailsView = () => {
  const { saleId } = useParams();
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [saleDetails, setSaleDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      // Aquí utilizamos el nuevo fetch
      const details = await actions.fetchOrderDetails(saleId);
      setSaleDetails(details);
      setIsLoading(false);
    };
    fetchSaleDetails();
  }, [saleId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Detalles de la Venta #{saleId}</h3>
      <div className="sale-details-list">
        {saleDetails.map((item, index) => (
          <div key={index} className="sale-item-card">
            <img
              src={item.image_url || "/path-to-default-image.jpg"}
              alt={item.name}
              className="img-thumbnail"
              style={{ width: "80px", height: "80px", marginRight: "15px" }}
            />
            <div>
              <h5>{item.name || "Sin nombre"}</h5>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio Unitario: ${item.unit_price.toLocaleString("es-CL")}</p>
              <p>Total: ${(item.quantity * item.unit_price).toLocaleString("es-CL")}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default SaleDetailsView;
