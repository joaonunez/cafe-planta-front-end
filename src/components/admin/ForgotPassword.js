import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

const ForgotPassword = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await actions.sendPasswordResetEmail(email);
    if (result.success) {
      setMessage(result.message);
      setError("");
      setTimeout(() => navigate("/admin-login"), 5000);
    } else {
      setError(result.message);
      setMessage("");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px", padding: "0 1rem" }}>
      <h2 className="text-center">Recuperar Contraseña</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
