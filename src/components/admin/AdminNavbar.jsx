import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import {
  FaBars,
  FaUserCog,
  FaClipboardList,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminNavbar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await actions.logoutAdmin();
    if (success) {
      navigate("/admin-login");
    } else {
      console.error("Error al intentar cerrar sesión.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/admin" className="navbar-brand">
        Panel Admin
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FaBars />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/admin/user-management" className="nav-link">
              <FaUserCog className="me-2" /> Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/inventory-management" className="nav-link">
              <FaClipboardList className="me-2" /> Inventario
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/combo-management" className="nav-link">
              <FaClipboardList className="me-2" /> Combos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/sales-chart" className="nav-link">
              <FaChartLine className="me-2" /> Gráfica de Ventas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/view-admin-all-sales" className="nav-link">
              <FaClipboardList className="me-2" /> Gestionar Ventas
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn nav-link text-white">
              <FaSignOutAlt className="me-2" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
