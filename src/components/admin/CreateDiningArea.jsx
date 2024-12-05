import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateDiningAreaForm = () => {
  const { store, actions } = useContext(Context);
  const [number, setNumber] = useState("");
  const [cafeId, setCafeId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cafes to populate the dropdown
    actions.fetchCafes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!number || !cafeId) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    const success = await actions.createDiningArea(number, cafeId);
    if (success) {
      Swal.fire("Éxito", "Mesa creada exitosamente.", "success");
      navigate("/admin/manage-dining-areas");
    } else {
      Swal.fire("Error", "No se pudo crear la mesa. Inténtalo nuevamente.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Mesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Número de Mesa
          </label>
          <input
            type="number"
            id="number"
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Ingrese el número de mesa"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cafe" className="form-label">
            Seleccione un Café
          </label>
          <select
            id="cafe"
            className="form-select"
            value={cafeId}
            onChange={(e) => setCafeId(e.target.value)}
            required
          >
            <option value="">Seleccione un Café</option>
            {store.cafes.map((cafe) => (
              <option key={cafe.id} value={cafe.id}>
                {cafe.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Mesa
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/manage-dining-areas")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CreateDiningAreaForm;
