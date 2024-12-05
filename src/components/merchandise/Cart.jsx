import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus, FaMinus } from "react-icons/fa";
import ScanQrModal from "./modals/ScanQRModal";

const Cart = () => {
  const { store, actions } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [isProcessing, setIsProcessing] = useState(false); // Estado para evitar múltiples solicitudes
  const navigate = useNavigate();

  useEffect(() => {
    actions.getCartItems();
  }, []);

  useEffect(() => {
    setCartItems(Array.isArray(store.cart) ? store.cart : []);
  }, [store.cart]);

  const handleQrDetected = async (qrContent) => {
    if (isProcessing) return; // Prevenir múltiples ejecuciones

    setIsProcessing(true); // Bloquear interacción mientras se procesa
    try {
      // Escanear el QR y procesar el pedido
      const qrData = await actions.scanQR(qrContent);

      if (!qrData) {
        Swal.fire("Error", "No se pudo leer el QR o la mesa no existe.", "error");
        return;
      }

      const { dining_area_id } = qrData;

      // Crear la venta
      const success = await actions.createSale(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), // Total Amount
        "", // Comments
        cartItems, // Items in the cart
        dining_area_id // Dining Area ID
      );

      if (success) {
        Swal.fire("Compra exitosa", "Tu pedido ha sido realizado y está en preparación.", "success");
        navigate("/customer/purchase-history");
      } else {
        Swal.fire("Error", "Hubo un problema al realizar la compra. Inténtalo de nuevo.", "error");
      }
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      Swal.fire("Error", "Hubo un problema inesperado. Inténtalo de nuevo más tarde.", "error");
    } finally {
      setIsProcessing(false); // Liberar bloqueo
      setIsModalOpen(false); // Cerrar el modal
    }
  };

  const handlePurchase = () => {
    if (isProcessing) return; // Prevenir clics múltiples
    setIsModalOpen(true); // Abrir el modal para escanear el QR
  };

  return (
    <div className="container mt-4">
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="mt-4">
          Tu carrito está vacío.{" "}
          <Link to="/customer/products">Explora productos</Link> o{" "}
          <Link to="/customer/combos">combos</Link>.
        </p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={item.image_url || "/path-to-default-image.jpg"}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Precio: ${item.price.toLocaleString("es-CL")}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Cantidad:</span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actions.updateCartItemQuantity(item.id, item.quantity - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => actions.updateCartItemQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger mt-2 w-100"
                    onClick={() => actions.removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString("es-CL")}</h4>
          <button
            className="btn btn-primary w-100"
            onClick={handlePurchase}
            disabled={isProcessing} // Deshabilitar botón si está procesando
          >
            {isProcessing ? "Procesando..." : "Comprar"}
          </button>
        </div>
      )}
      <ScanQrModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQrDetected={handleQrDetected}
      />
    </div>
  );
};

export default Cart;
