import React, { useState } from 'react';

const ConfirmDeleteUser = ({ user, onClose, onConfirm }) => {
  const [adminPassword, setAdminPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(adminPassword);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h5>Confirmar Eliminación</h5>
        <p>¿Estás seguro de que quieres eliminar al usuario {user.first_name} {user.last_name_father}?</p>
        <p>Ingresa tu contraseña de administrador para confirmar:</p>
        <input
          type="password"
          className="form-control mb-3"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger" onClick={handleConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteUser;
