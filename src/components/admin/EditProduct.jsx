import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/context";

const EditProduct = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    product_category_id: "",
    cafe_id: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cafesLoaded, setCafesLoaded] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!store.cafes || store.cafes.length === 0) {
        await actions.fetchCafes(); // Cargar sedes si no están cargadas
      }
      setCafesLoaded(true);

      if (!store.productCategories || store.productCategories.length === 0) {
        await actions.fetchProductCategories(); // Cargar categorías si no están cargadas
      }

      let product = store.adminProducts.find((p) => p.id === parseInt(id));
      if (!product) {
        product = await actions.fetchProductById(id);
      }

      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          stock: product.stock,
          product_category_id: product.product_category_id,
          cafe_id: product.cafe_id,
          image: null,
        });
        setPreviewImage(product.image_url);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, [id, store.adminProducts, store.productCategories, store.cafes, actions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.price || formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "El stock no puede ser negativo.";
    if (!formData.product_category_id)
      newErrors.product_category_id = "Selecciona una categoría.";
    if (!formData.cafe_id) newErrors.cafe_id = "Selecciona una sede.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (formData.image) {
      form.append("image", formData.image);
    }

    const success = await actions.updateProduct(id, form);
    if (success) {
      navigate(store.lastInventoryPage);
    } else {
      alert("Hubo un error al actualizar el producto.");
    }
  };

  if (isLoading || !cafesLoaded) {
    return <div>Cargando datos del producto...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Editar Producto</h3>
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

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate(store.lastInventoryPage)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
