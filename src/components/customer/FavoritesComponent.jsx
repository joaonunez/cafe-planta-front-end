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
      <h2 className="text-center mb-4">Mis Favoritos</h2>

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

      <div className="tab-content mt-4" id="myTabContent">
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
                  <div className="card h-100">
                    <img 
                      src={favorite.image_url || '/default-image.jpg'} 
                      className="card-img-top" 
                      alt={favorite.item_name} 
                      style={{ height: "150px", objectFit: "cover" }} 
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{favorite.item_name}</h5>
                      <p className="card-text">
                        <strong>Precio:</strong> ${favorite.price?.toLocaleString('es-CL')}
                      </p>
                      <p className="card-text">
                        <strong>Stock:</strong> {favorite.stock || "No disponible"}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => actions.removeFavorite(favorite.item_id, 2)} // 2 = Producto
                      >
                        Eliminar de Favoritos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No tienes productos favoritos
            </div>
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
                  <div className="card h-100">
                    <img 
                      src={favorite.image_url || '/default-image.jpg'} 
                      className="card-img-top" 
                      alt={favorite.item_name} 
                      style={{ height: "150px", objectFit: "cover" }} 
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{favorite.item_name}</h5>
                      <p className="card-text">
                        <strong>Precio:</strong> ${favorite.price?.toLocaleString('es-CL')}
                      </p>
                      <p className="card-text">
                        <strong>Descripción:</strong> {favorite.description || "Sin descripción"}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => actions.removeFavorite(favorite.item_id, 1)} // 1 = Combo
                      >
                        Eliminar de Favoritos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No tienes combos favoritos
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesComponent;
