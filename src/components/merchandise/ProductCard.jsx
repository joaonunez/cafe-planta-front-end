import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";

const ProductCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Estado local para manejar los favoritos

  useEffect(() => {
    actions.requestCustomerProducts(); // Cargar productos
    actions.getFavorites(); // Cargar favoritos desde el servidor
  }, []);

  useEffect(() => {
    // Cuando se actualizan los favoritos en el store, ajustamos el estado local de los favoritos de productos
    const productFavorites = store.customerFavorites
      .filter((fav) => fav.item_type_id === 2)  // '2' es para productos
      .map((fav) => fav.item_id);
    setFavoriteProducts(productFavorites);
  }, [store.customerFavorites]);

  const toggleFavorite = (product) => {
    const isFavorite = favoriteProducts.includes(product.id);
    if (isFavorite) {
      // Eliminar de favoritos
      actions.removeFavorite(product.id, 2); // Llamamos la acción para eliminar de favoritos, 2 es para productos
      setFavoriteProducts(favoriteProducts.filter((id) => id !== product.id)); // Eliminar localmente
    } else {
      // Agregar a favoritos
      actions.addFavorite(product.id, 2); // '2' es el ID de 'product' en la tabla ItemType
      setFavoriteProducts([...favoriteProducts, product.id]); // Agregar localmente
    }
  };

  return (
    <div className="container">
      <h1>Productos</h1>
      <div className="row">
        {store.customerRequestProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>  {/* Mostrar el nombre del producto */}
                <p className="card-text">Precio: ${product.price}</p>  {/* Mostrar el precio */}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
