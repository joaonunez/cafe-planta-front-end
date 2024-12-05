import React, { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { Context } from "../../store/context";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { FaUserCog, FaClipboardList, FaChartLine } from "react-icons/fa";
import UserManagement from "../../components/admin/UserManagement";
import InventoryManagement from "../../components/admin/InventoryManagement";
import ViewAllSales from "../../components/admin/ViewAllSales";
import ComboManagement from "../../components/admin/ComboManagement";
import AddProduct from "../../components/admin/AddProduct";
import EditProduct from "../../components/admin/EditProduct";
import EditCombo from "../../components/admin/EditCombo"; // Nuevo componente
import CreateCombo from "../../components/admin/CreateCombo";
import ManageDiningAreas from "../../components/admin/ManageDiningAreas";
import CreateDiningAreaForm from "../../components/admin/CreateDiningArea";

const AdminHome = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!store.token || store.admin?.role_id !== 1) {
      navigate("/admin-login");
    }
  }, [store.token, store.admin, navigate]);

  // Función para determinar si una ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {store.token && <AdminNavbar />}

      <div className="container mt-4">
        {location.pathname === "/admin" && (
          <div className="text-center mb-4">
            <h2 className="mb-3">Panel de Administración</h2>
            <p>
              Bienvenido, {store.admin?.first_name}. ¿Qué acción deseas realizar
              hoy?
            </p>
          </div>
        )}

        {/* Diseño responsive para enlaces del panel */}
        <div className="row text-center g-2">
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/user-management"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/user-management") ? "active-link" : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/user-management")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaUserCog
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/user-management")
                    ? "text-white"
                    : "text-dark"
                }
              >
                Gestión de Usuarios
              </small>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/inventory-management"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/inventory-management")
                  ? "active-link"
                  : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/inventory-management")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaClipboardList
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/inventory-management")
                    ? "text-white"
                    : "text-dark"
                }
              >
                Gestión de Inventario
              </small>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/combo-management"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/combo-management")
                  ? "active-link"
                  : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/combo-management")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaClipboardList
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/combo-management")
                    ? "text-white"
                    : "text-dark"
                }
              >
                Gestión de Combos
              </small>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/manage-dining-areas"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/manage-dining-areas")
                  ? "active-link"
                  : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/manage-dining-areas")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaClipboardList
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/manage-dining-areas")
                    ? "text-white"
                    : "text-dark"
                }
              >
                Gestionar Mesas
              </small>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/sales-chart"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/sales-chart") ? "active-link" : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/sales-chart")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaChartLine
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/sales-chart") ? "text-white" : "text-dark"
                }
              >
                Gráfica de Ventas
              </small>
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Link
              to="/admin/view-admin-all-sales"
              className={`d-flex flex-column align-items-center text-decoration-none p-2 shadow-sm rounded ${
                isActive("/admin/view-admin-all-sales")
                  ? "active-link"
                  : "text-dark"
              }`}
              style={{
                backgroundColor: isActive("/admin/view-admin-all-sales")
                  ? "#343a40"
                  : "#f8f9fa",
              }}
            >
              <FaClipboardList
                size={window.innerWidth < 768 ? 24 : 30}
                className="mb-2"
              />
              <small
                className={
                  isActive("/admin/view-admin-all-sales")
                    ? "text-white"
                    : "text-dark"
                }
              >
                Gestionar Ventas
              </small>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/inventory-management"
            element={<InventoryManagement />}
          />
          <Route path="/combo-management" element={<ComboManagement />} />
          <Route path="/view-admin-all-sales" element={<ViewAllSales />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-combo/:id" element={<EditCombo />} />
          <Route path="/create-combo" element={<CreateCombo />} />
          <Route path="/manage-dining-areas" element={<ManageDiningAreas />} />
          <Route path="/create-dining-area" element={<CreateDiningAreaForm />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminHome;
