const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
      error: null,
      customerRequestProducts: [],
      customerRequestCombos: [],
    },
    actions: {
      login: async (username, password) => {
        try {
          const response = await fetch(
            "http://localhost:3001/customer/login-customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
              credentials: "include", // Incluir cookies en la solicitud
            }
          );

          const result = await response.json();

          // Comprobar si el login fue exitoso
          if (response.ok && result.token) {
            // Guardar el usuario y token en el store
            setStore({
              user: result.customer,
              token: result.token,
              error: null,
            });

            // Guardar en localStorage
            localStorage.setItem("user", JSON.stringify(result.customer));
            localStorage.setItem("token", result.token);
            return true;
          } else {
            // Manejar errores de autenticación
            setStore({ error: result.error });
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
          setStore({ error: "Error de conexión. Intenta nuevamente." });
          return false;
        }
      },
      logout: () => {
        // Limpiar el store y localStorage al cerrar sesión
        setStore({
          user: null,
          token: null,
        });
        localStorage.removeItem("user");
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
            console.error("Error fetching products: ", data);
          }
        } catch (err) {
          console.error("Error in requestCustomerProducts action: ", err);
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
            console.error("Error fetching combos: ", data);
          }
        } catch (err) {
          console.error("Error in requestCustomerCombos action: ", err);
        }
      },
    },
  };
};

export default getState;
