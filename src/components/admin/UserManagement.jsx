import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/context';
import UserDetailsCard from './cards/UserCard';

const UserManagement = () => {
  const { store, actions } = useContext(Context);
  const [nameFilter, setNameFilter] = useState('');
  const [rutFilter, setRutFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [cafeFilter, setCafeFilter] = useState(''); // Nuevo filtro por sede de café
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      await actions.fetchUsersOnSystem();
      await actions.fetchCafes(); 
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    setRutFilter('');
    setRoleFilter('');
    setCafeFilter('');
    setCurrentPage(1);
  };

  const handleRutFilterChange = (e) => {
    setRutFilter(e.target.value);
    setNameFilter('');
    setRoleFilter('');
    setCafeFilter('');
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    setNameFilter('');
    setRutFilter('');
    setCafeFilter('');
    setCurrentPage(1);
  };

  const handleCafeFilterChange = (e) => {
    setCafeFilter(e.target.value);
    setNameFilter('');
    setRutFilter('');
    setRoleFilter('');
    setCurrentPage(1);
  };

  const filteredUsers = store.queriedUsers.filter(user => {
    const matchesName = nameFilter
      ? user.first_name.toLowerCase().startsWith(nameFilter.toLowerCase())
      : true;
    const matchesRut = rutFilter
      ? user.rut.toLowerCase().startsWith(rutFilter.toLowerCase())
      : true;
    const matchesRole = roleFilter
      ? user.role_id.toString() === roleFilter
      : true;
    const matchesCafe = cafeFilter
      ? user.cafe_id.toString() === cafeFilter
      : true;
    return matchesName && matchesRut && matchesRole && matchesCafe;
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
            <div className="col-md-3 mb-3">
              <input
                type="text"
                placeholder="Filtrar por nombre"
                className="form-control"
                value={nameFilter}
                onClick={() => {
                  setRutFilter('');
                  setRoleFilter('');
                  setCafeFilter('');
                }}
                onChange={handleNameFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                placeholder="Filtrar por RUT"
                className="form-control"
                value={rutFilter}
                onClick={() => {
                  setNameFilter('');
                  setRoleFilter('');
                  setCafeFilter('');
                }}
                onChange={handleRutFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-control"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="">Filtrar por Rol</option>
                <option value="1">Administrador</option>
                <option value="2">Gerente</option>
                <option value="3">Vendedor</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={cafeFilter}
                onChange={handleCafeFilterChange}
              >
                <option value="">Filtrar por Sede de Café</option>
                {store.cafes && store.cafes.map(cafe => (
                  <option key={cafe.id} value={cafe.id}>
                    {cafe.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {currentUsers && currentUsers.length > 0 ? (
            <div className="row">
              {currentUsers.map(user => (
                <div key={user.rut} className="col-md-4">
                  <UserDetailsCard user={user} />
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
