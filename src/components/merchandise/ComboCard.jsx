import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";

const ComboCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteCombos, setFavoriteCombos] = useState([]);

  useEffect(() => {
    actions.requestCustomerCombos(); // Cargar combos
    actions.getFavorites(); // Cargar favoritos desde el servidor
  }, []);

  useEffect(() => {
    // Ajustar el estado local de los favoritos de combos
    const comboFavorites = store.customerFavorites
      ? store.customerFavorites
          .filter((fav) => fav.item_type_id === 1) // '1' es el ID para 'combo_menu' en ItemType
          .map((fav) => fav.item_id)
      : [];
    setFavoriteCombos(comboFavorites);
  }, [store.customerFavorites]);

  const toggleFavorite = (combo) => {
    const isFavorite = favoriteCombos.includes(combo.id);
    if (isFavorite) {
      // Eliminar de favoritos
      actions.removeFavorite(combo.id, 1); // Usar '1' para 'combo_menu'
      setFavoriteCombos(favoriteCombos.filter((id) => id !== combo.id));
    } else {
      // Agregar a favoritos
      actions.addFavorite(combo.id, 1); // Usar '1' para 'combo_menu'
      setFavoriteCombos([...favoriteCombos, combo.id]);
    }
  };

  return (
    <div className="container">
      <h1>Combos</h1>
      <div className="row">
        {store.customerRequestCombos.map((combo, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{combo.name}</h5>  {/* Mostrar el nombre del combo */}
                <p className="card-text">Precio: ${combo.price}</p>  {/* Mostrar el precio */}
                <button
                  className={`btn ${
                    favoriteCombos.includes(combo.id)
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => toggleFavorite(combo)}
                >
                  {favoriteCombos.includes(combo.id) ? "♥" : "♡"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboCard;
