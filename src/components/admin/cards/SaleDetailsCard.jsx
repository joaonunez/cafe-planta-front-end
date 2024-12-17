import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../store/context';

const SaleDetailsCard = ({ sale, onDelete, onViewDetails, onSaveChanges }) => {
  const { store, actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSale, setEditedSale] = useState({ ...sale });

  useEffect(() => {
    if (isEditing) {
      actions.fetchSaleEditDetails(sale.id);
    }
  }, [isEditing, sale.id]);

  const handleEditClick = () => setIsEditing(true);
  
  const handleCancelClick = () => {
    setEditedSale({ ...sale });
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    const updatedData = {
      ...editedSale,
      status: editedSale.waiter_rut ? "Orden Tomada" : "En preparación"
    };
    onSaveChanges(updatedData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  // Condiciones para deshabilitar los campos de selección
  const isDiningAreaDisabled = !editedSale.cafe_id;
  const isWaiterDisabled = !editedSale.cafe_id;

  return (
    <div className="sale-card">
      <div className="sale-card-header">
        <h5>Venta ID: {sale.id}</h5>
        <p><strong>Estado:</strong> <span className="blinking-status">{sale.status}</span></p>
      </div>
      <div className="sale-card-body">
        <div className="sale-detail">
          <p><strong>Fecha:</strong> {sale.date}</p>
          
          {/* Mostrar el nombre del cliente (Inmodificable) */}
          <p><strong>Cliente:</strong> {sale.customer_name || "Aún sin asignar"}</p>
          
          {isEditing ? (
            <div>
              <label><strong>Monto Total:</strong></label>
              <input
                type="number"
                name="total_amount"
                value={editedSale.total_amount}
                onChange={handleChange}
                className="form-control"
              />

              <label><strong>Comentarios:</strong></label>
              <input
                type="text"
                name="comments"
                value={editedSale.comments || ""}
                onChange={handleChange}
                className="form-control"
              />

              <label><strong>Cafetería:</strong></label>
              <select
                name="cafe_id"
                value={editedSale.cafe_id || ""}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Seleccione una Cafetería</option>
                {store.saleEditData?.cafes && store.saleEditData.cafes.map((cafe) => (
                  <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
                ))}
              </select>

              <label><strong>Mesero:</strong></label>
              <select
                name="waiter_rut"
                value={editedSale.waiter_rut || ""}
                onChange={handleChange}
                className="form-control"
                disabled={isWaiterDisabled}
              >
                <option value="">Seleccione un Mesero</option>
                {store.saleEditData?.waiters && 
                  store.saleEditData.waiters
                    .filter(waiter => waiter.cafe_id === parseInt(editedSale.cafe_id))
                    .map((waiter) => (
                      <option key={waiter.rut} value={waiter.rut}>
                        {waiter.first_name} {waiter.last_name_father}
                      </option>
                    ))
                }
              </select>

              <label><strong>Mesa:</strong></label>
              <select
                name="dining_area_id"
                value={editedSale.dining_area_id || ""}
                onChange={handleChange}
                className="form-control"
                disabled={isDiningAreaDisabled}
              >
                <option value="">Seleccione una Mesa</option>
                {store.saleEditData?.dining_areas && 
                  store.saleEditData.dining_areas
                    .filter(area => area.cafe_id === parseInt(editedSale.cafe_id))
                    .map((area) => (
                      <option key={area.id} value={area.id}>{area.number}</option>
                    ))
                }
              </select>
            </div>
          ) : (
            <div>
              <p><strong>Monto Total:</strong> ${sale.total_amount.toLocaleString("es-CL")}</p>
              <p><strong>Comentarios:</strong> {sale.comments || "Sin comentarios"}</p>
              <p><strong>Cafetería:</strong> {sale.cafe_name || "Aún sin asignar"}</p>
              <p><strong>Mesero:</strong> {sale.waiter_name || "Aún sin asignar"}</p>
              <p><strong>Mesa:</strong> {sale.dining_area_id ? `${sale.dining_area_number}` : "Aún sin asignar"}</p>
            </div>
          )}
        </div>
      </div>
      <div className="sale-card-footer">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="btn btn-success btn-sm">Aceptar</button>
            <button onClick={handleCancelClick} className="btn btn-secondary btn-sm ms-2">Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => onDelete(sale.id)} className="btn btn-danger btn-sm">Eliminar</button>
            <button onClick={onViewDetails} className="btn btn-primary btn-sm ms-2">Ver Detalles</button>
            <button onClick={handleEditClick} className="btn btn-warning btn-sm ms-2">Editar Datos</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SaleDetailsCard;
