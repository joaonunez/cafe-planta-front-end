import React, { useEffect, useContext } from 'react';
import { Context } from '../../store/context';

const ComboCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.requestCustomerCombos();  // Llamamos la acción para obtener los combos
    }, []);

    return (
        <div className="container">
            <h1>Combos</h1>
            <div className="row">
                {store.customerRequestCombos.map((combo, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{combo.name}</h5>
                                <p className="card-text">Price: ${combo.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComboCard;
