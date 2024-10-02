import React from "react";

import AddUser from "../../components/admin/AddUser";
import ListUsers from "../../components/admin/ListUsers";


const GestionUsuarios = () => {
  return (
    <div className="container">
      <h2>Gestión de Usuarios</h2>
      <div className="mb-4">
        <AddUser />
      </div>
      <ListUsers />
    </div>
  );
};

export default GestionUsuarios;