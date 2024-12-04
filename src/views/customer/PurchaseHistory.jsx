import React from "react";
import CustomerOrder from "../../components/customer/CustomerOrder";
import CustomerPurchaseHistory from "../../components/customer/CustomerPurchaseHistory";

const PurchaseHistory = () => {
  return (
    <div className="container mt-4">
      <h2>Historial de Compras</h2>
      <div className="mb-5">
        <h3 className="mt-5">Pedido En Curso</h3>
        <CustomerOrder />
      </div>
      <hr />
      <div>
        <CustomerPurchaseHistory />
      </div>
    </div>
  );
};

export default PurchaseHistory;
