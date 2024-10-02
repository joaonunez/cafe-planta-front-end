import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/context";

const AddUser = () => {
  const { store, actions } = useContext(Context);
  const [newUser, setNewUser] = useState({
    rut: "",
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    // Cargar los roles al montar el componente
    actions.fetchRoles();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addUser(newUser);
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rut</label>
          <input
            type="text"
            name="rut"
            className="form-control"
            value={newUser.rut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={newUser.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={newUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            value={newUser.role}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            {store.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
