import React, { useEffect, useContext } from 'react';
import { Context } from '../../store/context';

const ProductCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.requestCustomerProducts();  // Llamamos la acción para obtener los productos
    }, []);

    return (
        <div className="container">
            <h1>Products</h1>
            <div className="row">
                {store.customerRequestProducts.map((product, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
