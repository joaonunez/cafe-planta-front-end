import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ComboCard = ({ combo, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/edit-combo/${combo.id}`);
  };

  const handleDelete = async () => {
    const { value: password } = await Swal.fire({
      title: "Confirmar eliminación",
      html: `
        <input 
          type="password" 
          id="custom-password-input" 
          class="swal2-input"
          autocomplete="new-password"
          spellcheck="false"
          placeholder="Contraseña"
          style="display: block; width: 100%; margin: 0 auto; padding: 10px;"
        />
      `,
      preConfirm: () => {
        const passwordInput = Swal.getPopup().querySelector("#custom-password-input");
        return passwordInput.value || ""; // Retornar la contraseña ingresada
      },
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (password) {
      const success = await onDelete(combo.id, password);
      if (success) {
        Swal.fire("Eliminado", "El combo ha sido eliminado correctamente.", "success");
      } else {
        Swal.fire("Error", "Hubo un problema al eliminar el combo.", "error");
      }
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <img
        src={combo.image_url || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={`Imagen de ${combo.name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{combo.name}</h5>
        <p className="card-text">
          Precio: ${combo.price.toFixed(2)} <br />
          Sede: {combo.cafe_name || "Sin sede asignada"} <br />
        </p>
        <button className="btn btn-primary" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger ms-2" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
