const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      customer: JSON.parse(localStorage.getItem("customer")) || null,
      token: localStorage.getItem("token") || null,
      error: null,
      customerRequestProducts: [],
      customerRequestCombos: [],
      customerFavorites: [],
    },
    actions: {
      loginCustomer: async (username, password) => {
        try {
          const response = await fetch(
            "http://localhost:3001/customer/login-customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
              credentials: "include",
            }
          );

          const result = await response.json();

          if (response.ok && result.token) {
            // Guardar el cliente y token en el store
            setStore({
              customer: result.customer,  // Cambiamos 'user' a 'customer'
              token: result.token,
              error: null,
            });

            // Guardar en localStorage
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
      logoutCustomer: () => {
        setStore({
          customer: null,  // Cambiamos 'user' a 'customer'
          token: null,
        });
        localStorage.removeItem("customer");
        localStorage.removeItem("token");
      },
      requestCustomerProducts: async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/product/customer-request-products"
          );
          const data = await response.json();

          if (response.ok) {
            setStore({ customerRequestProducts: data });
          } else {
            console.error("Error al obtener productos: ", data);
          }
        } catch (err) {
          console.error("Error en requestCustomerProducts: ", err);
        }
      },
      requestCustomerCombos: async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/combo_menu/customer-request-combos"
          );
          const data = await response.json();

          if (response.ok) {
            setStore({ customerRequestCombos: data });
          } else {
            console.error("Error al obtener combos: ", data);
          }
        } catch (err) {
          console.error("Error en requestCustomerCombos: ", err);
        }
      },
      getFavorites: async () => {
        const { token } = getStore();
        try {
          const response = await fetch(
            "http://localhost:3001/favorite/list-favorites-customer",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          const favorites = await response.json();

          if (response.ok) {
            setStore({ customerFavorites: favorites });
          } else {
            console.error("Error al obtener favoritos: ", favorites.error);
          }
        } catch (err) {
          console.error("Error al obtener favoritos: ", err);
        }
      },
      addFavorite: async (itemId, itemTypeId) => {
        const { token } = getStore();
        try {
          const response = await fetch(
            "http://localhost:3001/favorite/add-to-favorites-customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                item_id: itemId,
                item_type_id: itemTypeId,
              }),
              credentials: "include",
            }
          );

          const result = await response.json();
          console.log(result);
          if (response.ok) {
            getActions().getFavorites(); // Refrescar la lista de favoritos
          } else {
            console.error("Error al agregar favorito: ", result.error);
          }
        } catch (err) {
          console.error("Error al agregar favorito: ", err);
        }
      },
      removeFavorite: async (itemId, itemTypeId) => {
        const { token } = getStore();
        try {
          const response = await fetch(
            "http://localhost:3001/favorite/remove-favorite-customer",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ item_id: itemId, item_type_id: itemTypeId }),
              credentials: "include",
            }
          );

          const result = await response.json();
          console.log(result);
          if (response.ok) {
            getActions().getFavorites(); // Refrescar la lista de favoritos
          } else {
            console.error("Error al eliminar favorito: ", result.error);
          }
        } catch (err) {
          console.error("Error al eliminar favorito: ", err);
        }
      },
      registerCustomer: async (customerData) => {
        try {
          const response = await fetch(
            "http://localhost:3001/customer/register-customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(customerData),
            }
          );

          if (response.ok) {
            return { success: true, message: 'Registro exitoso' };
          } else {
            const errorData = await response.json();
            console.error("Error al registrar el cliente:", errorData);
            return { success: false, message: errorData.message || 'Error en el registro' };
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return { success: false, message: 'Error de red' };
        }
      },


    },
  };
};

export default getState;
