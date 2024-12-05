import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Html5QrcodeScanner } from "html5-qrcode";

const ScanQrModal = ({ isOpen, onClose, onQrDetected }) => {
  const qrScannerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      startQrScanner();
    }

    return () => {
      stopQrScanner();
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
    const validation = await actions.validateLatestOrder();
    if (!validation.canCreateOrder) {
      Swal.fire("No permitido", validation.message, "warning");
      return;
    }
  
    // Continuar con la creación de la venta si pasa la validación
    const qrData = await actions.scanQR(qrContent);
    if (!qrData) {
      Swal.fire("Error", "No se pudo leer el QR o la mesa no existe.", "error");
      return;
    }
  
    const { dining_area_id } = qrData;
    const success = await actions.createSale(totalPrice, "", cartItems, dining_area_id);
    if (success) {
      Swal.fire("Compra exitosa", "Tu pedido ha sido realizado y está en preparación.", "success");
      navigate("/customer/purchase-history");
    } else {
      Swal.fire("Error", "Hubo un problema al realizar la compra. Inténtalo de nuevo.", "error");
    }
  };
  

  const handleQrError = (errorMessage) => {
    console.warn("QR Error:", errorMessage);
    setError("No se pudo leer el QR. Inténtalo de nuevo.");
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>Escanea el QR</h2>
          <div id="qr-reader" style={{ width: "100%" }} />
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-danger mt-3" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    )
  );
};

export default ScanQrModal;
