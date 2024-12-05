import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import SaleDetailsCard from './cards/SaleDetailsCard';

const ViewAllSales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // Solo se llama una vez para obtener todas las ventas
        if (!store.allSalesRequestByAdmin.length) {
            actions.fetchAllSalesRequestByAdmin();
        }
    }, [store.allSalesRequestByAdmin.length]);

    const handleDeleteSale = (saleId) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la venta con ID ${saleId}?`)) {
            actions.deleteSaleByAdmin(saleId);
        }
    };
    

    const handleViewDetails = (saleId) => {
        navigate(`/admin/view-admin-all-sales/view-details/${saleId}`);
    };

    const handleSaveChanges = (updatedSale) => {
        actions.updateSaleDetails(updatedSale.id, updatedSale);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Todas las Ventas</h2>
            <div className="sale-cards-list">
                {store.allSalesRequestByAdmin.map((sale) => (
                    <SaleDetailsCard
                        key={sale.id}
                        sale={sale}
                        onDelete={handleDeleteSale}
                        onViewDetails={() => handleViewDetails(sale.id)}
                        onSaveChanges={handleSaveChanges}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAllSales;