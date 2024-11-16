import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

const ProductCard = () => {
  const { store, actions } = useContext(Context);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Estado local para favoritos
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      await actions.requestCustomerProducts(); // Cargar productos
      await actions.fetchProductCategories(); // Cargar categorías
      await actions.getFavorites(); // Cargar favoritos
      setIsLoading(false); // Cambia a falso después de cargar los datos
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Ajustar el estado local de los favoritos de productos
    const productFavorites = store.customerFavorites
      ? store.customerFavorites
          .filter((fav) => fav.item_type_id === 2) // '2' es el ID para 'product' en ItemType
          .map((fav) => fav.item_id)
      : [];
    setFavoriteProducts(productFavorites);
  }, [store.customerFavorites]);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  // Filtrar productos
  const filteredProducts = store.customerRequestProducts.filter((product) => {
    const matchesName = nameFilter
      ? product.name?.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const matchesCategory = categoryFilter
      ? product.product_category_id === parseInt(categoryFilter)
      : true;
    return matchesName && matchesCategory;
  });

  // Paginación
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

  const toggleFavorite = async (product) => {
    const isFavorite = favoriteProducts.includes(product.id);
    if (isFavorite) {
      await actions.removeFavorite(product.id, 2); // '2' es el ID para productos en ItemType
      setFavoriteProducts((prev) => prev.filter((id) => id !== product.id));
      Swal.fire({
        icon: "warning",
        title: "Favorito eliminado",
        text: `Has eliminado el producto ${product.name} de tus favoritos.`,
        iconHtml: "💔",
      });
    } else {
      await actions.addFavorite(product.id, 2); // '2' es el ID para productos en ItemType
      setFavoriteProducts((prev) => [...prev, product.id]);
      Swal.fire({
        icon: "success",
        title: "Favorito agregado",
        text: `Has agregado el producto ${product.name} a tus favoritos.`,
        iconHtml: "❤️",
      });
    }
  };

  const addToCart = (product) => {
    actions.addToCart(product.id, 2, 1); // '2' es el ID para productos, '1' es la cantidad
    Swal.fire({
      icon: "success",
      title: "Añadido al carrito",
      text: `El producto ${product.name} ha sido añadido al carrito.`,
    });
  };

  if (isLoading) {
    // Mostrar spinner de carga general mientras se cargan productos
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Productos Disponibles</h3>
      <div className="row mb-3">
        {/* Filtro por nombre */}
        <div className="col-md-6 mb-3">
          <input
            type="text"
            placeholder="Filtrar por nombre"
            className="form-control"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </div>
        {/* Filtro por categoría */}
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

      {/* Mostrar productos filtrados */}
      <div className="row">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={product.image_url || "/path-to-default-image.jpg"}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: ${product.price.toLocaleString("es-CL")}</p>
                  <button
                    className={`btn ${
                      favoriteProducts.includes(product.id) ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => toggleFavorite(product)}
                  >
                    {favoriteProducts.includes(product.id) ? "♥" : "♡"}
                  </button>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos que coincidan con los filtros.</p>
        )}
      </div>

      {/* Controles de paginación */}
      <div className="pagination-container mt-4">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="page-info mx-3">
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
    </div>
  );
};

export default ProductCard;
