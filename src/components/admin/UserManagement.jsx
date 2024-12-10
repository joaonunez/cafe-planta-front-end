import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/context';
import UserDetailsCard from './cards/UserDetailsCard';

const UserManagement = () => {
  const { store, actions } = useContext(Context);
  const [editingRut, setEditingRut] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Número de usuarios por página

  useEffect(() => {
    actions.fetchUsersOnSystem();
    actions.fetchCafes(); 
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

  // Paginación - Cálculo de la página actual y usuarios visibles
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = store.queriedUsers.slice(firstUserIndex, lastUserIndex);

  const totalPages = Math.ceil(store.queriedUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mt-4">
      <h3>Gestión de Usuarios</h3>

      <div className="row">
        {currentUsers.map((user) => (
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
        ))}
      </div>

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
    </div>
  );
};

export default UserManagement;
