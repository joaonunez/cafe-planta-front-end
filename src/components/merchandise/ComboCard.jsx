import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2"; 

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

  const toggleFavorite = async (combo) => {
    const isFavorite = favoriteCombos.includes(combo.id);
    if (isFavorite) {
      await actions.removeFavorite(combo.id, 1); // Esperar a que se complete la eliminación
      setFavoriteCombos((prev) => prev.filter((id) => id !== combo.id)); // Actualizar el estado
      // Notificar que se eliminó el favorito
      Swal.fire({
        icon: 'warning', // Puedes usar 'warning' para el corazón roto
        title: 'Favorito eliminado',
        text: `Has eliminado el combo ${combo.name} de tus favoritos.`,
        iconHtml: '💔', // Cambiar ícono a corazón roto
      });
    } else {
      await actions.addFavorite(combo.id, 1); // Esperar a que se complete la adición
      setFavoriteCombos((prev) => [...prev, combo.id]); // Actualizar el estado
      // Notificar que se agregó el favorito
      Swal.fire({
        icon: 'success', // Mantener el ícono de éxito
        title: 'Favorito agregado',
        text: `Has agregado el combo ${combo.name} a tus favoritos.`,
        iconHtml: '❤️', // Cambiar ícono a corazón lleno
      });
    }
  };

  return (
    <div className="container">
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
