import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/context";

const EditCombo = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cafe_id: "",
    image: null,
    products: [], // Productos asociados al combo
  });

  const [previewImage, setPreviewImage] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cafesLoaded, setCafesLoaded] = useState(false); // Maneja el estado de las sedes cargadas

  // Cargar datos de sedes y combo al montar el componente
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!store.cafes || store.cafes.length === 0) {
        await actions.fetchCafes();
      }
      setCafesLoaded(true);

      const combo = await actions.fetchComboById(id);
      if (combo) {
        setFormData({
          name: combo.name,
          price: combo.price,
          cafe_id: combo.cafe_id,
          image: null,
          products: combo.products || [],
        });
        setPreviewImage(combo.image_url);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, [id, store.cafes, actions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setProductSearch(term);

    if (term.length >= 2) {
      const results = await actions.searchProducts(term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addProductToCombo = (product) => {
    if (!formData.products.some((p) => p.id === product.id)) {
      setFormData({
        ...formData,
        products: [...formData.products, product],
      });
    }
    setProductSearch("");
    setSearchResults([]);
  };

  const removeProductFromCombo = (productId) => {
    setFormData({
      ...formData,
      products: formData.products.filter((product) => product.id !== productId),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.price || formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (!formData.cafe_id) newErrors.cafe_id = "Selecciona una sede.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const comboData = new FormData();
    comboData.append("name", formData.name);
    comboData.append("price", formData.price);
    comboData.append("cafe_id", formData.cafe_id);
    comboData.append("products", JSON.stringify(formData.products.map((p) => p.id)));
    if (formData.image) {
      comboData.append("image", formData.image);
    }

    const success = await actions.updateCombo(id, comboData);
    if (success) {
      navigate("/admin/combo-management");
    } else {
      alert("Hubo un error al actualizar el combo.");
    }
  };

  if (isLoading || !cafesLoaded) {
    return <div>Cargando datos del combo...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Editar Combo</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        {previewImage && (
          <div className="col-md-12 text-center mb-3">
            <img
              src={previewImage}
              alt="Vista previa"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}

        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="cafe_id" className="form-label">Sede</label>
          <select
            className={`form-select ${errors.cafe_id ? "is-invalid" : ""}`}
            id="cafe_id"
            name="cafe_id"
            value={formData.cafe_id}
            onChange={handleChange}
          >
            <option value="">Seleccione una sede</option>
            {store.cafes.map((cafe) => (
              <option key={cafe.id} value={cafe.id}>
                {cafe.name}
              </option>
            ))}
          </select>
          {errors.cafe_id && <div className="invalid-feedback">{errors.cafe_id}</div>}
        </div>

        <div className="col-md-12">
          <label htmlFor="image" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="productSearch" className="form-label">Buscar Productos</label>
          <input
            type="text"
            className="form-control"
            id="productSearch"
            value={productSearch}
            onChange={handleSearchChange}
          />
          <div className="search-results" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="d-flex align-items-center justify-content-between border-bottom py-2"
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/50"}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  className="me-2"
                />
                <span>{product.name}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => addProductToCombo(product)}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-12">
          <h5>Productos en el Combo</h5>
          <ul className="list-group">
            {formData.products.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <img
                  src={product.image_url || "https://via.placeholder.com/50"}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  className="me-2"
                />
                <span>{product.name}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeProductFromCombo(product.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/admin/combo-management")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCombo;
