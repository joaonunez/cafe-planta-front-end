const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      admin: JSON.parse(localStorage.getItem("admin")) || null,
      customer: JSON.parse(localStorage.getItem("customer")) || null,
      token: localStorage.getItem("token") || null,
      error: null,
      customerRequestProducts: [],
      customerRequestCombos: [],
      customerFavorites: [],
      cart: [],
      cartId: null, // Aseguramos que cartId esté presente y disponible
      queriedUsers: [],
      adminProducts: [],
      productCategories: [],
    },
    actions: {
      // ------------------------------------
      // AUTH - Autenticación
      // ------------------------------------
      loginCustomer: async (username, password) => {
        try {
          const response = await fetch("http://localhost:3001/customer/login-customer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include",
          });
          const result = await response.json();

          if (response.ok && result.token) {
            setStore({ customer: result.customer, token: result.token, error: null });
            localStorage.setItem("customer", JSON.stringify(result.customer));
            localStorage.setItem("token", result.token);
            return true;
          } else {
            setStore({ error: result.error });
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
          setStore({ error: "Error de conexión. Intenta nuevamente." });
          return false;
        }
      },

      logoutCustomer: async () => {
        try {
          const response = await fetch("http://localhost:3001/customer/logout-customer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (response.ok) {
            setStore({ customer: null, token: null });
            localStorage.removeItem("customer");
            localStorage.removeItem("token");
            return true;
          } else {
            console.error("Error al cerrar sesión del cliente");
            return false;
          }
        } catch (error) {
          console.error("Error de red al intentar cerrar sesión:", error);
          return false;
        }
      },

      loginAdmin: async (username, password) => {
        try {
          const response = await fetch("http://localhost:3001/user/admin-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include",
          });
          const result = await response.json();

          if (response.ok && result.token) {
            setStore({ admin: result.user, token: result.token, error: null });
            localStorage.setItem("admin", JSON.stringify(result.user));
            localStorage.setItem("token", result.token);
            return true;
          } else {
            setStore({ error: result.error });
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
          setStore({ error: "Error de conexión. Intenta nuevamente." });
          return false;
        }
      },

      logoutAdmin: async () => {
        try {
          const response = await fetch("http://localhost:3001/user/logout-admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (response.ok) {
            setStore({ admin: null, token: null });
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
            return true;
          } else {
            console.error("Error al cerrar sesión del administrador");
            return false;
          }
        } catch (error) {
          console.error("Error de red al intentar cerrar sesión:", error);
          return false;
        }
      },

      registerCustomer: async (customerData) => {
        try {
          const response = await fetch("http://localhost:3001/customer/register-customer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
          });

          if (response.ok) {
            return { success: true, message: "Registro exitoso" };
          } else {
            const errorData = await response.json();
            console.error("Error al registrar el cliente:", errorData);
            return { success: false, message: errorData.message || "Error en el registro" };
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return { success: false, message: "Error de red" };
        }
      },

      // ------------------------------------
      // CART - Carrito
      // ------------------------------------
      addToCart: async (item_id, item_type_id, quantity = 1) => {
        const { token } = getStore();

        try {
          const response = await fetch("http://localhost:3001/cart/add_item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ item_id, item_type_id, quantity }),
          });

          if (!response.ok) throw new Error("Failed to add item to cart");
          const data = await response.json();
          setStore({ cart: data.cart });
        } catch (error) {
          console.error("Error adding item to cart:", error);
        }
      },

      getCartItems: async () => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/cart/get_items", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to fetch cart items");
          const data = await response.json();
          const cartId = data.cart.length > 0 ? data.cart[0].cart_id : null;
          setStore({ cart: data.cart, cartId });
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      },

      removeFromCart: async (itemId) => {
        const { token, cart } = getStore();
        try {
          const response = await fetch(`http://localhost:3001/cart/delete_item/${itemId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to delete item from cart");
          const updatedCart = cart.filter((item) => item.id !== itemId);
          setStore({ cart: updatedCart });
        } catch (error) {
          console.error("Error deleting item from cart:", error);
        }
      },

      updateCartItemQuantity: async (itemId, newQuantity) => {
        const { token, cart } = getStore();
        try {
          const response = await fetch(`http://localhost:3001/cart/update_item/${itemId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ quantity: newQuantity }),
          });

          if (!response.ok) throw new Error("Failed to update item quantity");
          const data = await response.json();
          const updatedCart = cart.map((item) =>
            item.id === itemId ? { ...item, quantity: data.quantity } : item
          );
          setStore({ cart: updatedCart });
        } catch (error) {
          console.error("Error updating item quantity:", error);
        }
      },

      clearCartItems: async () => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/cart/clear_items", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to clear cart items");
          return true;
        } catch (error) {
          console.error("Error clearing cart items:", error);
          return false;
        }
      },

      deleteCart: async () => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/cart/delete", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to delete cart");
          return true;
        } catch (error) {
          console.error("Error deleting cart:", error);
          return false;
        }
      },

      // ------------------------------------
      // FAVORITES - Favoritos
      // ------------------------------------
      getFavorites: async () => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/favorite/list-favorites-customer", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          const favorites = await response.json();
          if (response.ok) {
            setStore({ customerFavorites: favorites });
          } else {
            console.error("Error al obtener favoritos:", favorites.error);
          }
        } catch (err) {
          console.error("Error al obtener favoritos:", err);
        }
      },

      addFavorite: async (itemId, itemTypeId) => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/favorite/add-to-favorites-customer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ item_id: itemId, item_type_id: itemTypeId }),
            credentials: "include",
          });

          const result = await response.json();
          if (response.ok) {
            getActions().getFavorites();
          } else {
            console.error("Error al agregar favorito:", result.error);
          }
        } catch (err) {
          console.error("Error al agregar favorito:", err);
        }
      },

      removeFavorite: async (itemId, itemTypeId) => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/favorite/remove-favorite-customer", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ item_id: itemId, item_type_id: itemTypeId }),
            credentials: "include",
          });

          const result = await response.json();
          if (response.ok) {
            getActions().getFavorites();
          } else {
            console.error("Error al eliminar favorito:", result.error);
          }
        } catch (err) {
          console.error("Error al eliminar favorito:", err);
        }
      },

      // ------------------------------------
      // SALES - Ventas
      // ------------------------------------
      createSale: async (totalAmount, comments) => {
        const { token, cartId } = getStore();
    
        if (!cartId) {
            console.error("Error: No se encontró cartId en el store.");
            return false;
        }
    
        try {
            const response = await fetch("http://localhost:3001/sale/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ total_amount: totalAmount, comments, cart_id: cartId }),
            });
    
            if (!response.ok) throw new Error("Failed to create sale");
            setStore({ cart: [] });
            await getActions().clearCartItems();
            await getActions().deleteCart();
            return true;
        } catch (error) {
            console.error("Error creating sale:", error);
            return false;
        }
    },
    

      getLatestOrder: async () => {
        const { token } = getStore();
        try {
          const response = await fetch("http://localhost:3001/sale/latest", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to fetch latest order");
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching latest order:", error);
          return null;
        }
      },

      getOrderDetails: async (saleId) => {
        const { token } = getStore();
        try {
          const response = await fetch(`http://localhost:3001/sale/order_details/${saleId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Failed to fetch order details");
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching order details:", error);
          return null;
        }
      },

      // ------------------------------------
      // PRODUCT MANAGEMENT - Gestión de Productos
      // ------------------------------------
      requestCustomerProducts: async () => {
        try {
          const response = await fetch("http://localhost:3001/product/customer-request-products");
          const data = await response.json();

          if (response.ok) {
            setStore({ customerRequestProducts: data });
          } else {
            console.error("Error al obtener productos:", data);
          }
        } catch (err) {
          console.error("Error en requestCustomerProducts:", err);
        }
      },

      requestCustomerCombos: async () => {
        try {
          const response = await fetch("http://localhost:3001/combo_menu/customer-request-combos");
          const data = await response.json();

          if (response.ok) {
            setStore({ customerRequestCombos: data });
          } else {
            console.error("Error al obtener combos:", data);
          }
        } catch (err) {
          console.error("Error en requestCustomerCombos:", err);
        }
      },

      fetchAdminProducts: async () => {
        try {
          const response = await fetch("http://localhost:3001/product/admin-get-products", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const products = await response.json();

          if (response.ok) {
            setStore({ adminProducts: products });
          } else {
            console.error("Error fetching products for admin:", products.error);
          }
        } catch (error) {
          console.error("Error in fetchAdminProducts:", error);
        }
      },

      fetchProductCategories: async () => {
        try {
          const response = await fetch("http://localhost:3001/product_category");
          const data = await response.json();

          if (response.ok) {
            setStore({ productCategories: data });
          } else {
            console.error("Error al obtener categorías de productos");
          }
        } catch (error) {
          console.error("Error al obtener categorías de productos:", error);
        }
      },

      // ------------------------------------
      // USER MANAGEMENT - Gestión de Usuarios
      // ------------------------------------
      fetchUsersOnSystem: async () => {
        try {
          const response = await fetch("http://localhost:3001/user/get_users_on_system");
          const data = await response.json();

          if (response.ok) {
            setStore({ queriedUsers: data });
          } else {
            console.error("Error al obtener los usuarios:", data);
          }
        } catch (err) {
          console.error("Error en fetchUsersOnSystem:", err);
        }
      },
    },
  };
};

export default getState;
