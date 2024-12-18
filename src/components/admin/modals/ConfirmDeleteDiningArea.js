import React, { useState } from 'react';

const ConfirmDeleteDiningArea = ({ area, onClose, onConfirm }) => {
  const [adminPassword, setAdminPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(adminPassword);
  };

  return (
    <div className="modal-container" style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="modal-content" style={{ background:'#fff', padding:'20px', borderRadius:'5px' }}>
        <h5>Confirmar Eliminación</h5>
        <p>¿Estás seguro de que quieres eliminar la mesa #{area.number}?</p>
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

export default ConfirmDeleteDiningArea;
