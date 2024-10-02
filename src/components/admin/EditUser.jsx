import React, { useState, useEffect } from "react";

const EditUser = ({ currentUser, onEdit }) => {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to edit the user
    fetch(`/api/users/${user.rut}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User edited:", data);
        onEdit(data); // Notify parent component that user was edited
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={user.name}
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
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          name="role"
          className="form-control"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="Manager">Manager</option>
          <option value="Seller">Seller</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        Save Changes
      </button>
    </form>
  );
};

export default EditUser;
