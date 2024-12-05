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
  const navigate = useNavigate();

  useEffect(() => {
    actions.getCartItems();
  }, []);

  useEffect(() => {
    setCartItems(Array.isArray(store.cart) ? store.cart : []);
  }, [store.cart]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    actions.updateCartItemQuantity(item.id, newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: "¿Eliminar del carrito?",
      text: `¿Estás seguro de que deseas eliminar "${item.name}" del carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        actions.removeFromCart(item.id);
        Swal.fire("Eliminado", `"${item.name}" ha sido eliminado del carrito.`, "success");
      }
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQrDetected = async (qrContent) => {
    // Lógica para procesar el QR detectado
    const qrData = await actions.scanQR(qrContent);

    if (!qrData) {
      Swal.fire("Error", "No se pudo leer el QR o la mesa no existe.", "error");
      return;
    }

    const { dining_area_id, cafe_id } = qrData;

    // Si todo está bien, proceder con la compra
    const success = await actions.createSale(totalPrice, "", cartItems, dining_area_id, cafe_id);
    if (success) {
      Swal.fire("Compra exitosa", "Tu pedido ha sido realizado y está en preparación.", "success");
      navigate("/customer/purchase-history");
    } else {
      Swal.fire("Error", "Hubo un problema al realizar la compra. Inténtalo de nuevo.", "error");
    }
  };

  const handlePurchase = () => {
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
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger mt-2 w-100"
                    onClick={() => handleRemoveItem(item)}
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
          <h4>Total: ${totalPrice.toLocaleString("es-CL")}</h4>
          <button className="btn btn-primary w-100" onClick={handlePurchase}>
            Comprar
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
