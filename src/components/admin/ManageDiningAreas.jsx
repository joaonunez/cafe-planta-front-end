import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteDiningArea from "./modals/ConfirmDeleteDiningArea";

const ManageDiningAreas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);

    useEffect(() => {
        actions.fetchDiningAreas();
    }, []);

    const diningAreas = Array.isArray(store.diningAreas) ? store.diningAreas : [];

    const handleDeleteClick = (area) => {
        setSelectedArea(area);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (adminPassword) => {
        if (!selectedArea) return;
        const result = await actions.deleteDiningArea(selectedArea.id, adminPassword);
        if (result.success) {
            alert("Mesa eliminada exitosamente");
            setShowDeleteModal(false);
            setSelectedArea(null);
        } else {
            alert(`Error: ${result.message}`);
        }
    };

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
                                    {/* Botón para eliminar la mesa */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(area)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay mesas disponibles.</p>
                )}
            </div>

            {showDeleteModal && selectedArea && (
                <ConfirmDeleteDiningArea
                    area={selectedArea}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default ManageDiningAreas;
