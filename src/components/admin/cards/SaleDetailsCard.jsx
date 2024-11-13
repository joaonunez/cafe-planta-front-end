import React from 'react';

const SaleDetailsCard = ({ sale, onDelete, onViewDetails }) => {
  return (
    <div className="sale-card">
      <div className="sale-card-header">
        <h5>Venta ID: {sale.id}</h5>
        <p><strong>Estado:</strong> <span className="blinking-status">{sale.status}</span></p>
      </div>
      <div className="sale-card-body">
        <div className="sale-detail">
          <p><strong>Fecha:</strong> {new Date(sale.date).toLocaleString()}</p>
          <p><strong>Monto Total:</strong> ${sale.total_amount.toLocaleString("es-CL")}</p>
          <p><strong>Comentarios:</strong> {sale.comments || "Sin comentarios"}</p>
          <p><strong>Cliente:</strong> {sale.customer_name || "Aún sin asignar"}</p>
          <p><strong>Cliente RUT:</strong> {sale.customer_rut || "Aún sin asignar"}</p>
          <p><strong>Cafetería:</strong> {sale.cafe_name || "Aún sin asignar"}</p>
          <p><strong>Mesero:</strong> {sale.waiter_name || "Aún sin asignar"}</p>
          <p><strong>Mesero RUT:</strong> {sale.waiter_rut || "Aún sin asignar"}</p>
          <p><strong>Mesa:</strong> {sale.dining_area_name || "Aún sin asignar"}</p>
        </div>
      </div>
      <div className="sale-card-footer">
        <button onClick={() => onDelete(sale.id)} className="btn btn-danger btn-sm">
          Eliminar
        </button>
        <button onClick={onViewDetails} className="btn btn-primary btn-sm ms-2">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default SaleDetailsCard;
