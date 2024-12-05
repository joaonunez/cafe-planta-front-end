import React, { useEffect, useRef, useContext, useState } from "react";
import Swal from "sweetalert2";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/context";

const ScanQrModal = ({ isOpen, onClose, onQrDetected, cartItems }) => {
  const qrScannerRef = useRef(null);
  const { store, actions } = useContext(Context);
  const [isProcessing, setIsProcessing] = useState(false); // Estado de procesamiento
  const navigate = useNavigate(); // Para redirigir a otra página

  useEffect(() => {
    if (isOpen) {
      startQrScanner();
      actions.setQrScanStatus("processing"); // Inicia el escaneo
    }
    return () => {
      stopQrScanner();
      actions.resetQrScanStatus(); // Restablece el estado al cerrar
    };
  }, [isOpen]);

  const startQrScanner = () => {
    if (qrScannerRef.current) return;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    qrScannerRef.current = new Html5QrcodeScanner("qr-reader", config, false);
    qrScannerRef.current.render(handleQrDetected, handleQrError);
  };

  const stopQrScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear().catch((err) => console.error("Error al detener el escáner:", err));
      qrScannerRef.current = null;
    }
  };

  const handleQrDetected = async (qrContent) => {
    if (store.qrScanStatus === "processing") return; // Evitar múltiples ejecuciones

    try {
        const qrData = await actions.scanQR(qrContent);

        if (!qrData || !qrData.id || !qrData.cafe_id) {
            Swal.fire("Error", "No se pudo leer el QR o la mesa no existe.", "error");
            return;
        }

        // Crear la venta
        const success = await actions.createSale(
            cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            "", // Comments
            cartItems,
            qrData.id
        );

        if (success) {
            Swal.fire("Compra exitosa", "Tu pedido ha sido realizado y está en preparación.", "success");
            navigate("/customer/purchase-history");
        } else {
            Swal.fire("Error", "Hubo un problema al realizar la compra. Inténtalo de nuevo.", "error");
        }
    } catch (error) {
        console.error("Error al procesar el QR:", error);

        // Mostrar el mensaje de error que viene del backend, si está disponible
        const errorMessage =
            error.response?.data?.error || // Mensaje de error en el cuerpo de la respuesta
            error.message || // Mensaje de error general
            "No se pudo procesar el QR.";

        Swal.fire("Error", errorMessage, "error");
    } finally {
        actions.resetQrScanStatus(); // Restablecer el estado
    }
};


  const handleQrError = (errorMessage) => {
    console.warn("QR Error:", errorMessage);
    actions.setQrScanStatus("error");
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose} disabled={store.qrScanStatus === "processing"}>
            &times;
          </button>
          <h2>Escanea el QR</h2>
          <div id="qr-reader" style={{ width: "100%" }} />
          {store.qrScanStatus === "error" && <p className="text-danger">No se pudo leer el QR. Inténtalo de nuevo.</p>}
          <button
            className="btn btn-danger mt-3"
            onClick={onClose}
            disabled={store.qrScanStatus === "processing"}
          >
            {store.qrScanStatus === "processing" ? "Procesando..." : "Cancelar"}
          </button>
        </div>
      </div>
    )
  );
};

export default ScanQrModal;
