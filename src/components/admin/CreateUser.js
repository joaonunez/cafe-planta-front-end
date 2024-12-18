import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: "",
    first_name: "",
    last_name_father: "",
    last_name_mother: "",
    username: "",
    email: "",
    password: "",
    role_id: "",
    cafe_id: ""
  });

  useEffect(() => {
    if (!store.token || store.admin?.role_id !== 1) {
      navigate("/admin-login");
      return;
    }
    if (store.cafes.length === 0) {
      actions.fetchCafes();
    }
    // Obtener los roles desde el servidor
    if (store.roles.length === 0) {
      actions.fetchRoles();
    }
  }, [store.token, store.admin, store.cafes.length, store.roles.length, actions, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.createUser(formData);
    if (result.success) {
      alert("Usuario creado exitosamente");
      navigate("/admin/user-management");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>RUT:</label>
          <input 
            type="text" 
            className="form-control" 
            name="rut" 
            value={formData.rut} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Nombre:</label>
          <input 
            type="text" 
            className="form-control" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Apellido Paterno:</label>
          <input 
            type="text" 
            className="form-control" 
            name="last_name_father" 
            value={formData.last_name_father} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Apellido Materno:</label>
          <input 
            type="text" 
            className="form-control" 
            name="last_name_mother" 
            value={formData.last_name_mother} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Username:</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Contraseña:</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Rol:</label>
          <select 
            name="role_id" 
            className="form-control" 
            value={formData.role_id} 
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Rol</option>
            {store.roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Cafetería:</label>
          <select 
            name="cafe_id" 
            className="form-control" 
            value={formData.cafe_id} 
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una Cafetería</option>
            {store.cafes.map(cafe => (
              <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
};

export default CreateUser;
