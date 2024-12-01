import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card card mb-3 shadow-sm">
      <img
        src={product.image_url || '/path-to-default-image.jpg'}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"><strong>Categoría:</strong> {product.product_category_name}</p>
        <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
        <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
        <p className="card-text"><strong>Cafetería:</strong> {product.cafe_name}</p>
        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate(`/admin/edit-product/${product.id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
