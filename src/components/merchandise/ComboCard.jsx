import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

const ComboCard = () => {
  const { store, actions } = useContext(Context);
  const [favoriteCombos, setFavoriteCombos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner general de carga
  const [imageLoading, setImageLoading] = useState({}); // Estado para el spinner por imagen
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro por nombre
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const combosPerPage = 4; // Número de combos por página

  useEffect(() => {
    const loadCombosAndFavorites = async () => {
      await actions.requestCustomerCombos(); // Cargar combos
      await actions.getFavorites(); // Cargar favoritos desde el servidor
      setLoading(false); // Ocultar el spinner general cuando se completen las cargas
    };

    loadCombosAndFavorites();
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
      await actions.removeFavorite(combo.id, 1);
      setFavoriteCombos((prev) => prev.filter((id) => id !== combo.id));
      Swal.fire({
        icon: "warning",
        title: "Favorito eliminado",
        text: `Has eliminado el combo ${combo.name} de tus favoritos.`,
        iconHtml: "💔",
      });
    } else {
      await actions.addFavorite(combo.id, 1);
      setFavoriteCombos((prev) => [...prev, combo.id]);
      Swal.fire({
        icon: "success",
        title: "Favorito agregado",
        text: `Has agregado el combo ${combo.name} a tus favoritos.`,
        iconHtml: "❤️",
      });
    }
  };

  const handleImageLoad = (comboId) => {
    setImageLoading((prevLoading) => ({
      ...prevLoading,
      [comboId]: false, // Ocultar el spinner para este combo específico
    }));
  };

  const addToCart = (combo) => {
    actions.addToCart(combo.id, 1, 1); // `1` es el item_type_id para combos y `1` es la cantidad
    Swal.fire({
      icon: "success",
      title: "Añadido al carrito",
      text: `El combo ${combo.name} ha sido añadido al carrito.`,
    });
  };

  if (loading) {
    // Mostrar spinner de carga general mientras se cargan combos y favoritos
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Filtrar combos por palabras clave
  const filteredCombos = store.customerRequestCombos.filter((combo) => {
    const keywords = searchTerm.toLowerCase().split(" "); // Dividir en palabras clave
    return keywords.every((keyword) =>
      combo.name.toLowerCase().includes(keyword)
    ); // Verificar si cada palabra clave está en el nombre del combo
  });

  // Determinar combos para la página actual
  const indexOfLastCombo = currentPage * combosPerPage;
  const indexOfFirstCombo = indexOfLastCombo - combosPerPage;
  const currentCombos = filteredCombos.slice(indexOfFirstCombo, indexOfLastCombo);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredCombos.length / combosPerPage);

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar combos por palabras clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {currentCombos.map((combo, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="image-container" style={{ position: "relative" }}>
                {imageLoading[combo.id] !== false && (
                  <div className="spinner-border spinner" role="status" />
                )}
                <img
                  src={combo.image_url || "/path-to-default-image.jpg"} // Proporcionar una imagen por defecto
                  className="card-img-top"
                  alt={combo.name}
                  onLoad={() => handleImageLoad(combo.id)} // Ocultar el spinner al cargar la imagen
                  onError={() => handleImageLoad(combo.id)} // En caso de error, oculta el spinner
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{combo.name}</h5>
                <p className="card-text">Precio: ${combo.price.toLocaleString("es-CL")}</p>
                <button
                  className={`btn ${
                    favoriteCombos.includes(combo.id) ? "btn-danger" : "btn-outline-danger"
                  }`}
                  onClick={() => toggleFavorite(combo)}
                >
                  {favoriteCombos.includes(combo.id) ? "♥" : "♡"}
                </button>
                <button className="btn btn-primary mt-2" onClick={() => addToCart(combo)}>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary mx-1"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
