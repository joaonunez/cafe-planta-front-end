import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import ComboCard from "./cards/ComboCard";
import { useNavigate } from "react-router-dom";

const ComboManagement = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      await actions.fetchAdminCombos();
      setIsLoading(false);
    };
    fetchCombos();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Gestión de Combos</h3>
      {/* Botón para crear un nuevo combo */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/create-combo")}
        >
          Crear Nuevo Combo
        </button>
      </div>

      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="row">
          {store.adminCombos && store.adminCombos.length > 0 ? (
            store.adminCombos.map((combo) => (
              <div className="col-md-4" key={combo.id}>
                <ComboCard combo={combo}
                onDelete={actions.deleteCombo}
                 />
              </div>
            ))
          ) : (
            <p>No hay combos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboManagement;
