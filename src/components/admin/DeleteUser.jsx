import React from "react";

const DeleteUser = ({ rut, onDelete }) => {
  const handleDelete = () => {
    // Simulate API call to delete the user
    fetch(`/api/users/${rut}`, {
      method: "DELETE"
    })
      .then(() => {
        console.log("User deleted");
        onDelete(rut); // Notify parent component that user was deleted
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteUser;
