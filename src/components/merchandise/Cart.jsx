import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importar íconos

const Cart = () => {
  const { store, actions } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Llamar a la función para obtener los items del carrito desde el backend
    actions.getCartItems();
  }, []);

  useEffect(() => {
    // Actualizar el estado local cuando el carrito en el store cambie
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
          <button className="btn btn-primary w-100">Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
