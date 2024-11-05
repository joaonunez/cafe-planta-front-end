
import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h5>{user.first_name} {user.last_name_father}</h5>
        <p>{user.role_name}</p>
      </div>
      <div className="profile-card-body">
        <p><strong>RUT:</strong> {user.rut}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Usuario:</strong> {user.username}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
