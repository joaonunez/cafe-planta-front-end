import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/context';
import ProfileCard from './cards/UserCard';



const UserManagement = () => {
  const { store, actions } = useContext(Context);
  const [nameFilter, setNameFilter] = useState('');
  const [rutFilter, setRutFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      await actions.fetchUsersOnSystem();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    setRutFilter('');
    setCurrentPage(1); // Resetear a la primera página al aplicar un filtro
  };

  const handleRutFilterChange = (e) => {
    setRutFilter(e.target.value);
    setNameFilter('');
    setCurrentPage(1); // Resetear a la primera página al aplicar un filtro
  };

  const filteredUsers = store.queriedUsers.filter(user => {
    const matchesName = nameFilter
      ? user.first_name.toLowerCase().startsWith(nameFilter.toLowerCase())
      : true;
    const matchesRut = rutFilter
      ? user.rut.toLowerCase().startsWith(rutFilter.toLowerCase())
      : true;
    return matchesName && matchesRut;
  });

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

  return (
    <div className="container mt-4">
      <h3>Gestión de Usuarios</h3>

      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                placeholder="Filtrar por nombre"
                className="form-control"
                value={nameFilter}
                onClick={() => setRutFilter('')}
                onChange={handleNameFilterChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Filtrar por RUT"
                className="form-control"
                value={rutFilter}
                onClick={() => setNameFilter('')}
                onChange={handleRutFilterChange}
              />
            </div>
          </div>

          {currentUsers && currentUsers.length > 0 ? (
            <div className="row">
              {currentUsers.map(user => (
                <div key={user.rut} className="col-md-4">
                  <ProfileCard user={user} />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay usuarios registrados.</p>
          )}

          <div className="pagination-container mb-3">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="page-info">Página {currentPage} de {totalPages}</span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
