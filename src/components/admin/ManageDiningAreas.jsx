import React, { useContext, useEffect } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";

const ManageDiningAreas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchDiningAreas();
    }, []);

    const diningAreas = Array.isArray(store.diningAreas) ? store.diningAreas : [];

    return (
        <div className="container mt-4">
            <h2>Gestión de Mesas</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/admin/create-dining-area")}
            >
                Crear Mesa
            </button>
            <div className="row">
                {diningAreas.length > 0 ? (
                    diningAreas.map((area) => (
                        <div key={area.id} className="col-md-4 mb-3">
                            <div className="card">
                                <img
                                    src={area.qr_code}
                                    className="card-img-top"
                                    alt={`QR Mesa ${area.number}`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Mesa #{area.number}</h5>
                                    <p>ID del Café: {area.cafe_id}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay mesas disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ManageDiningAreas;
