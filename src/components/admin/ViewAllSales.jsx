import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import SaleDetailsCard from './cards/SaleDetailsCard';

const ViewAllSales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchAllSalesRequestByAdmin();
    }, [actions]);

    const handleDeleteSale = (saleId) => {
        actions.deleteSaleByAdmin(saleId);
    };

    const handleViewDetails = (saleId) => {
        navigate(`/admin/view-admin-all-sales/view-details/${saleId}`);
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
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAllSales;
