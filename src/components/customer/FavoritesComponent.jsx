import React, { useEffect, useContext } from "react";
import { Context } from "../../store/context";

const FavoritesComponent = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavorites(); // Cargar favoritos al cargar la página
  }, []);

  const productFavorites = store.customerFavorites
    ? store.customerFavorites.filter((fav) => fav.item_type_id === 2) // Productos
    : [];

  const comboFavorites = store.customerFavorites
    ? store.customerFavorites.filter((fav) => fav.item_type_id === 1) // Combos
    : [];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Mis Favoritos</h2>

      <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
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
          {productFavorites.length > 0 ? (
            <div className="row">
              {productFavorites.map((favorite) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={favorite.item_id}>
                  <div className="card shadow-sm">
                    <img
                      src={favorite.image_url || "/path-to-default-image.jpg"}
                      className="card-img-top"
                      alt={favorite.item_name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{favorite.item_name}</h5>
                      <p className="card-text">
                        Precio: <strong>${favorite.price?.toLocaleString('es-CL') || 'No disponible'}</strong>
                      </p>
                      <p className="card-text text-truncate">
                        Descripción: {favorite.description || 'No hay descripción disponible'}
                      </p>
                      <button className="btn btn-primary btn-sm">Ver Detalles</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-3">No tienes productos favoritos</p>
          )}
        </div>

        {/* Combos favoritos */}
        <div
          className="tab-pane fade"
          id="combo-favorites"
          role="tabpanel"
          aria-labelledby="combo-tab"
        >
          {comboFavorites.length > 0 ? (
            <div className="row">
              {comboFavorites.map((favorite) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={favorite.item_id}>
                  <div className="card shadow-sm">
                    <img
                      src={favorite.image_url || "/path-to-default-image.jpg"}
                      className="card-img-top"
                      alt={favorite.item_name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{favorite.item_name}</h5>
                      <p className="card-text">
                        Precio: <strong>${favorite.price?.toLocaleString('es-CL') || 'No disponible'}</strong>
                      </p>
                      <p className="card-text text-truncate">
                        Descripción: {favorite.description || 'No hay descripción disponible'}
                      </p>
                      <button className="btn btn-primary btn-sm">Ver Detalles</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-3">No tienes combos favoritos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesComponent;
