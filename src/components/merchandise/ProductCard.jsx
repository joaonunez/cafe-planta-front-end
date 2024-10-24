import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2"; // Importar SweetAlert2

const ProductCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    actions.requestCustomerProducts(); // Cargar productos
    actions.getFavorites(); // Cargar favoritos desde el servidor
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
      await actions.removeFavorite(product.id, 2); // Esperar a que se complete la eliminación
      setFavoriteProducts((prev) => prev.filter((id) => id !== product.id)); // Actualizar el estado
      // Notificar que se eliminó el favorito
      Swal.fire({
        icon: 'success',
        title: 'Favorito eliminado',
        text: `Has eliminado el producto ${product.name} de tus favoritos.`,
      });
    } else {
      await actions.addFavorite(product.id, 2); // Esperar a que se complete la adición
      setFavoriteProducts((prev) => [...prev, product.id]); // Actualizar el estado
      // Notificar que se agregó el favorito
      Swal.fire({
        icon: 'success',
        title: 'Favorito agregado',
        text: `Has agregado el producto ${product.name} a tus favoritos.`,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        {store.customerRequestProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card card-producto">
              <img
                src={product.image_url} // Asegúrate de que tu producto tenga una propiedad image_url
                className="card-img-top"
                alt={product.name}
              />
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
