import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import ProductCard from './cards/ProductCard';

const InventoryManagement = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Para redirigir al formulario
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const productsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      await actions.fetchAdminProducts();
      await actions.fetchProductCategories();
      setIsLoading(false); // Cambia a falso después de cargar los datos
    };
    fetchData();
  }, []);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  const filteredProducts = store.adminProducts.filter((product) => {
    const matchesName = nameFilter
      ? product.name.toLowerCase().startsWith(nameFilter.toLowerCase())
      : true;
    const matchesCategory = categoryFilter
      ? product.product_category_id === parseInt(categoryFilter)
      : true;
    return matchesName && matchesCategory;
  });

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mt-4">
      <h3>Gestión de Inventario</h3>

      {/* Botón para añadir producto */}
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/add-product')} // Redirige al formulario
        >
          Añadir Producto
        </button>
      </div>

      {/* Spinner de carga */}
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
                className="form-control inventory-filter-input"
                value={nameFilter}
                onChange={handleNameFilterChange}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-control inventory-filter-select"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <option value="">Todas las Categorías</option>
                {store.productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-3">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p>No hay productos en inventario.</p>
            )}
          </div>

          <div className="pagination-container">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="page-info">
              Página {currentPage} de {totalPages}
            </span>
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

export default InventoryManagement;
