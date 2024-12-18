import React, { useState, useEffect, useRef } from 'react';

const ConfirmChangeUserPassword = ({ user, onClose, onConfirm }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const adminPasswordRef = useRef(null);

  useEffect(() => {
    // Dar foco al input del adminPassword cuando el modal se abre
    if (adminPasswordRef.current) {
      adminPasswordRef.current.focus();
    }
  }, []);

  const handleConfirm = () => {
    if (!adminPassword || !newPassword) {
      alert("Por favor ingresa la contraseña del administrador y la nueva contraseña.");
      return;
    }
    onConfirm(adminPassword, newPassword);
  };

  return (
    <div className="modal-container" 
      style={{
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        background:'rgba(0,0,0,0.5)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:9999
      }}
    >
      <div 
        className="modal-content bg-white p-4 rounded" 
        style={{width:'90%',maxWidth:'400px'}}
      >
        <h5>Cambiar Contraseña para {user.first_name} {user.last_name_father}</h5>
        
        <form autoComplete="off">
          <p className="mb-2">Ingrese la contraseña del administrador:</p>
          <input
            type="password"
            className="form-control mb-3"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            ref={adminPasswordRef}
            autoComplete="new-password" 
            name="admin_pass_input"
            id="admin_pass_input"
          />
          <p className="mb-2">Ingrese la nueva contraseña del usuario:</p>
          <input
            type="password"
            className="form-control mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            name="user_new_pass_input"
            id="user_new_pass_input"
          />

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>Cambiar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmChangeUserPassword;
