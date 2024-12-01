import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./cards/ProductCard";

const InventoryManagement = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const productsPerPage = 5;

  useEffect(() => {
    actions.fetchAdminProducts();
    actions.fetchProductCategories();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Guardar la ruta actual en el store global
    const currentPageUrl = `/admin/inventory-management?page=${currentPage}`;
    actions.setLastInventoryPage(currentPageUrl);
  }, [currentPage]);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    setSearchParams({ page: 1 });
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setSearchParams({ page: 1 });
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
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h3>Gestión de Inventario</h3>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/admin/add-product")}>
          Añadir Producto
        </button>
      </div>

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
                onChange={handleNameFilterChange}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-control"
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
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                />
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
