import React, { useEffect, useRef, useContext } from "react";
import Swal from "sweetalert2";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Context } from "../../store/context";

const ScanQrModal = ({ isOpen, onClose, onQrDetected }) => {
  const qrScannerRef = useRef(null);
  const { store, actions } = useContext(Context);

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

  const handleQrDetected = async (decodedText) => {
    if (store.qrScanStatus === "processing") return; // Evitar múltiples ejecuciones

    actions.setQrScanStatus("processing");
    try {
      const response = await fetch("https://back-end-cafe-planta.vercel.app/dining_area/scan_qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_content: decodedText }),
      });

      if (!response.ok) {
        const error = await response.json();
        actions.setQrScanStatus("error");
        throw new Error(error.error || "Error al procesar el QR");
      }

      const data = await response.json();
      actions.setQrScanStatus("success");
      onQrDetected(data); // Notificar al padre sobre el QR detectado
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al procesar el QR:", error);
      Swal.fire("Error", error.message || "No se pudo procesar el QR.", "error");
      actions.setQrScanStatus("error");
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
