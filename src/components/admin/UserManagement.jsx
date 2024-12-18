import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/context';
import UserDetailsCard from './cards/UserDetailsCard';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const { store, actions } = useContext(Context);
  const [editingRut, setEditingRut] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Número de usuarios por página
  const navigate = useNavigate();

  // Filtros
  const [nameFilter, setNameFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");
  const [rutFilter, setRutFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [cafeFilter, setCafeFilter] = useState("");

  useEffect(() => {
    actions.fetchUsersOnSystem();
    actions.fetchCafes();
    actions.fetchRoles();
  }, []);

  const handleEditClick = (user) => {
    if (editingRut === user.rut) return;
    setEditingRut(user.rut);
    setEditedUserData({ ...user });
  };

  const handleSaveClick = (user) => {
    actions.editUser(user.rut, editedUserData).then((response) => {
      if (response.success) {
        alert(response.message);
        setEditingRut(null);
      } else {
        alert(response.message);
      }
    });
  };

  const handleCancelClick = () => {
    setEditingRut(null);
    setEditedUserData({});
  };

  // Filtrado
  const filteredUsers = store.queriedUsers.filter(user => {
    const fullName = `${user.first_name} ${user.last_name_father} ${user.last_name_mother}`.toLowerCase();

    if (nameFilter && !fullName.includes(nameFilter.toLowerCase())) {
      return false;
    }

    if (userEmailFilter) {
      const userFields = `${user.username} ${user.email}`.toLowerCase();
      if (!userFields.includes(userEmailFilter.toLowerCase())) {
        return false;
      }
    }

    if (rutFilter && !user.rut.toLowerCase().includes(rutFilter.toLowerCase())) {
      return false;
    }

    if (roleFilter && parseInt(user.role_id) !== parseInt(roleFilter)) {
      return false;
    }

    if (cafeFilter && parseInt(user.cafe_id) !== parseInt(cafeFilter)) {
      return false;
    }

    return true;
  });

  // Paginación
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const roles = store.roles || [];
  const cafes = store.cafes || [];

  return (
    <div className="container mt-4">
      <h3>Gestión de Usuarios</h3>

      <div className="mb-3">
        <button className="btn btn-success" onClick={() => navigate("/admin/create-user")}>
          Crear Usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <label><strong>Filtrar por Nombre Completo:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Juan Perez Gonzalez"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="col-md-3 mb-3">
          <label><strong>Filtrar por Username o Email:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: jperez o jperez@mail.com"
            value={userEmailFilter}
            onChange={(e) => setUserEmailFilter(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="col-md-3 mb-3">
          <label><strong>Filtrar por RUT:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: 12345678-9"
            value={rutFilter}
            onChange={(e) => setRutFilter(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="col-md-3 mb-3">
          <label><strong>Filtrar por Rol:</strong></label>
          <select
            className="form-control"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos los Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label><strong>Filtrar por Cafetería:</strong></label>
          <select
            className="form-control"
            value={cafeFilter}
            onChange={(e) => setCafeFilter(e.target.value)}
          >
            <option value="">Todas las Cafeterías</option>
            {cafes.map(cafe => (
              <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Usuarios */}
      <div className="row">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div key={user.rut} className="col-md-4 mb-3">
              <UserDetailsCard
                user={user}
                onEditClick={() => handleEditClick(user)}
                isEditing={editingRut === user.rut}
                editedUserData={editedUserData}
                setEditedUserData={setEditedUserData}
                onSaveClick={() => handleSaveClick(user)}
                onCancelClick={handleCancelClick}
                setEditingRut={setEditingRut}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No se encontraron usuarios con esos criterios.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container mb-3 d-flex justify-content-center">
          <button
            className="btn btn-secondary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="page-info">Página {currentPage} de {totalPages}</span>
          <button
            className="btn btn-secondary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
