import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

const AddProduct = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    product_category_id: "",
    cafe_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    actions.fetchProductCategories();
    actions.fetchCafes();
    actions.fetchCloudinaryStats(); // Cargar estadísticas de Cloudinary
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.price || formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "El stock no puede ser negativo.";
    if (!formData.product_category_id) newErrors.product_category_id = "Selecciona una categoría.";
    if (!formData.cafe_id) newErrors.cafe_id = "Selecciona una sede.";
    if (!formData.image) newErrors.image = "Debes subir una imagen.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Tipos de imagen permitidos
    const maxSize = 10 * 1024 * 1024; // 10 MB en bytes

    if (!allowedTypes.includes(file.type)) {
      return "El archivo debe ser una imagen (JPEG, PNG, GIF).";
    }

    if (file.size > maxSize) {
      return "El archivo debe tener un tamaño menor a 10 MB.";
    }

    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const error = validateFile(file);

      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: error,
        }));
        setFormData({ ...formData, image: null });
        setPreviewImage(null);
        return;
      }

      // Si pasa las validaciones, limpiar errores y actualizar el estado
      setErrors((prevErrors) => {
        const { image, ...rest } = prevErrors;
        return rest;
      });

      setFormData({ ...formData, image: file });

      // Mostrar la vista previa de la imagen seleccionada
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("product_category_id", formData.product_category_id);
    form.append("cafe_id", formData.cafe_id);
    form.append("image", formData.image);

    const success = await actions.addProduct(form);
    if (success) {
      navigate("/admin/inventory-management");
    } else {
      alert("Hubo un error al crear el producto.");
    }
  };

  const cloudinaryStats = store.cloudinaryStats || {
    used_space: 0,
    total_space: 1,
    percentage_used: 0,
  };

  return (
    <div className="container mt-4">
      <h3>Añadir Producto</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        {previewImage && (
          <div className="col-md-12 text-center mb-3">
            <img
              src={previewImage}
              alt="Vista previa"
              style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "5px" }}
            />
          </div>
        )}

        {/* Nombre */}
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

        {/* Precio */}
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

        {/* Stock */}
        <div className="col-md-6">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
        </div>

        {/* Categoría */}
        <div className="col-md-6">
          <label htmlFor="product_category_id" className="form-label">Categoría</label>
          <select
            className={`form-select ${errors.product_category_id ? "is-invalid" : ""}`}
            id="product_category_id"
            name="product_category_id"
            value={formData.product_category_id}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {store.productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.product_category_id && (
            <div className="invalid-feedback">{errors.product_category_id}</div>
          )}
        </div>

        {/* Café */}
        <div className="col-md-6">
          <label htmlFor="cafe_id" className="form-label">Sede del Café</label>
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

        {/* Imagen */}
        <div className="col-md-12">
          <label htmlFor="image" className="form-label">Imagen</label>
          <input
            type="file"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}

          {/* Barra de progreso */}
          <div className="mt-3">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${cloudinaryStats.percentage_used}%`,
                  backgroundColor:
                    cloudinaryStats.percentage_used < 50
                      ? "green"
                      : cloudinaryStats.percentage_used < 80
                      ? "yellow"
                      : "red",
                }}
              >
                {cloudinaryStats.percentage_used.toFixed(1)}% usado
              </div>
            </div>
            <p className="text-muted mt-2">
              Espacio usado: {cloudinaryStats.used_space.toFixed(2)} GB /{" "}
              {cloudinaryStats.total_space.toFixed(2)} GB
            </p>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
