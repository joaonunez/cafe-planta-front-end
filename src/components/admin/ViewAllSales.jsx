// ViewAllSales.jsx
import React, { useEffect, useContext } from 'react';
import { Context } from '../../store/context';

const ViewAllSales = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamar a la acción para obtener todas las ventas cuando se carga el componente
        actions.fetchAllSalesRequestByAdmin();
    }, []);

    const handleDeleteSale = (saleId) => {
        // Llamar a la acción para eliminar la venta
        actions.deleteSaleByAdmin(saleId);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Todas las Ventas</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Monto Total</th>
                            <th>Estado</th>
                            <th>Comentarios</th>
                            <th>Cliente RUT</th>
                            <th>Cafetería ID</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.allSalesRequestByAdmin.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{new Date(sale.date).toLocaleString()}</td>
                                <td>{sale.total_amount}</td>
                                <td>{sale.status}</td>
                                <td>{sale.comments}</td>
                                <td>{sale.customer_rut}</td>
                                <td>{sale.cafe_id}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteSale(sale.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllSales;
