import React, { useEffect, useContext } from "react";
import { Context } from "../../store/context";

const FavoritesComponent = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavorites(); // Cargar favoritos al cargar la página
  }, []);

  const productFavorites = store.customerFavorites
    ? store.customerFavorites.filter((fav) => fav.item_type_id === 2)  // Productos
    : [];

  const comboFavorites = store.customerFavorites
    ? store.customerFavorites.filter((fav) => fav.item_type_id === 1)  // Combos
    : [];

  return (
    <div className="container mt-5">
      <h2>Mis Favoritos</h2>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="product-tab"
            data-bs-toggle="tab"
            data-bs-target="#product-favorites"
            type="button"
            role="tab"
            aria-controls="product-favorites"
            aria-selected="true"
          >
            Productos
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="combo-tab"
            data-bs-toggle="tab"
            data-bs-target="#combo-favorites"
            type="button"
            role="tab"
            aria-controls="combo-favorites"
            aria-selected="false"
          >
            Combos
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3" id="myTabContent">
        {/* Productos favoritos */}
        <div
          className="tab-pane fade show active"
          id="product-favorites"
          role="tabpanel"
          aria-labelledby="product-tab"
        >
          <h3>Productos Favoritos</h3>
          <ul className="list-group">
            {productFavorites.length > 0 ? (
              productFavorites.map((favorite) => (
                <li className="list-group-item" key={favorite.item_id}>
                  {favorite.item_name} - ID: {favorite.item_id}
                </li>
              ))
            ) : (
              <li className="list-group-item">No tienes productos favoritos</li>
            )}
          </ul>
        </div>

        {/* Combos favoritos */}
        <div
          className="tab-pane fade"
          id="combo-favorites"
          role="tabpanel"
          aria-labelledby="combo-tab"
        >
          <h3>Combos Favoritos</h3>
          <ul className="list-group">
            {comboFavorites.length > 0 ? (
              comboFavorites.map((favorite) => (
                <li className="list-group-item" key={favorite.item_id}>
                  {favorite.item_name} - ID: {favorite.item_id}
                </li>
              ))
            ) : (
              <li className="list-group-item">No tienes combos favoritos</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoritesComponent;
