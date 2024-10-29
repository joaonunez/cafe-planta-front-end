import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2"; // Importar SweetAlert2

const ProductCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner de toda la sección
  const [imageLoading, setImageLoading] = useState({}); // Estado para el spinner por producto

  useEffect(() => {
    const loadProductsAndFavorites = async () => {
      await actions.requestCustomerProducts(); // Cargar productos
      await actions.getFavorites(); // Cargar favoritos desde el servidor
      setLoading(false); // Desactivar spinner general una vez que se carguen los datos
    };

    loadProductsAndFavorites();
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

  const toggleFavorite = async (product) => {
    const isFavorite = favoriteProducts.includes(product.id);
    if (isFavorite) {
      await actions.removeFavorite(product.id, 2);
      setFavoriteProducts((prev) => prev.filter((id) => id !== product.id));
      Swal.fire({
        icon: "success",
        title: "Favorito eliminado",
        text: `Has eliminado el producto ${product.name} de tus favoritos.`,
      });
    } else {
      await actions.addFavorite(product.id, 2);
      setFavoriteProducts((prev) => [...prev, product.id]);
      Swal.fire({
        icon: "success",
        title: "Favorito agregado",
        text: `Has agregado el producto ${product.name} a tus favoritos.`,
      });
    }
  };

  const handleImageLoad = (productId) => {
    setImageLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: false, // Ocultar el spinner para este producto
    }));
  };

  const addToCart = (product) => {
    actions.addToCart(product.id, 2); // `2` es el item_type_id para productos
    Swal.fire({
      icon: "success",
      title: "Añadido al carrito",
      text: `El producto ${product.name} ha sido añadido al carrito.`,
    });
  };

  if (loading) {
    // Mostrar spinner de carga general mientras se cargan productos y favoritos
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {store.customerRequestProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card card-producto">
              <div className="image-container" style={{ position: "relative" }}>
                {imageLoading[product.id] !== false && (
                  <div className="spinner-border spinner" role="status" />
                )}
                <img
                  src={product.image_url || "/path-to-default-image.jpg"} // Proporcionar una imagen por defecto
                  className="card-img-top"
                  alt={product.name}
                  onLoad={() => handleImageLoad(product.id)} // Cuando la imagen se carga, oculta el spinner
                  onError={() => handleImageLoad(product.id)} // En caso de error, oculta el spinner
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <button
                  className={`btn ${
                    favoriteProducts.includes(product.id)
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => toggleFavorite(product)}
                >
                  {favoriteProducts.includes(product.id) ? "♥" : "♡"}
                </button>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => addToCart(product)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
