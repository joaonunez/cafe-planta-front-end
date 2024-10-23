import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";

const ProductCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    actions.requestCustomerProducts();
    actions.getFavorites();
  }, []);

  useEffect(() => {
    const productFavorites = store.customerFavorites
      .filter((fav) => fav.item_type_id === 2)
      .map((fav) => fav.item_id);
    setFavoriteProducts(productFavorites);
  }, [store.customerFavorites]);

  const toggleFavorite = (product) => {
    const isFavorite = favoriteProducts.includes(product.id);
    if (isFavorite) {
      actions.removeFavorite(product.id, 2);
      setFavoriteProducts(favoriteProducts.filter((id) => id !== product.id));
    } else {
      actions.addFavorite(product.id, 2);
      setFavoriteProducts([...favoriteProducts, product.id]);
    }
  };

  return (
    <div className="container">
      <h1>Productos</h1>
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