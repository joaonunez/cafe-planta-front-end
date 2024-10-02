import React, { useState, useEffect } from "react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch users
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h3>Users List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rut}>
              <td>{user.rut}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Actions for edit or delete */}
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
