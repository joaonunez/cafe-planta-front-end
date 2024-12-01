import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const { value: password } = await Swal.fire({
      title: "Confirmar eliminación",
      text: "Introduce tu contraseña para confirmar la eliminación del producto",
      input: "password",
      inputPlaceholder: "Contraseña",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
        autocomplete: "new-password", // Deshabilita sugerencias del navegador
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (password) {
      const success = await onDelete(product.id, password);
      if (success) {
        Swal.fire("Eliminado", "El producto ha sido eliminado correctamente.", "success");
      } else {
        Swal.fire("Error", "Hubo un problema al eliminar el producto.", "error");
      }
    }
  };

  return (
    <div className="product-card card mb-3 shadow-sm">
      <img
        src={product.image_url || "/path-to-default-image.jpg"}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          <strong>Categoría:</strong> {product.product_category_name}
        </p>
        <p className="card-text">
          <strong>Precio:</strong> ${product.price}
        </p>
        <p className="card-text">
          <strong>Stock:</strong> {product.stock}
        </p>
        <p className="card-text">
          <strong>Cafetería:</strong> {product.cafe_name}
        </p>
        <button
          className="btn btn-primary mt-2 me-2"
          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
        >
          Editar
        </button>
        <button className="btn btn-danger mt-2" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
