
import React from 'react';


const UserDetailsCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h5>{user.first_name} {user.last_name_father} {user.last_name_mother}</h5>
        <p>{user.role_name}</p>
      </div>
      <div className="user-card-body">
        <p><strong>RUT:</strong> {user.rut}</p>
        <p><strong>Nombre de Usuario:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role_name}</p>
        <p><strong>Cafetería:</strong> {user.cafe_name}</p>
      </div>
    </div>
  );
};

export default UserDetailsCard;
