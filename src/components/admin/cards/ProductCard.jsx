// src/components/admin/cards/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"><strong>Categoría:</strong> {product.product_category_name}</p>
        <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
        <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
        <p className="card-text"><strong>Cafetería:</strong> {product.cafe_name}</p>
        <p className="card-text"><strong>Tipo de Ítem:</strong> {product.item_type_name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
