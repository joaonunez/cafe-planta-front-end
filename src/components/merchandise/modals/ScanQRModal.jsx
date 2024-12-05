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
    if (qrScannerRef.current) {
      return;
    }

    const config = {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, // Tamaño de la caja de escaneo
      aspectRatio: 1.0,
    };

    qrScannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      config,
      /* verbose= */ false
    );

    qrScannerRef.current.render(
      handleQrDetected,
      handleQrError
    );
  };

  const stopQrScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear().catch((err) => console.error("Error al detener el escáner:", err));
      qrScannerRef.current = null;
    }
  };

  const handleQrDetected = async (decodedText) => {
    try {
      const response = await fetch("https://back-end-cafe-planta.vercel.app/dining_area/scan_qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qr_content: decodedText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al procesar el QR");
      }

      const data = await response.json();
      console.log("QR Procesado:", data);
      Swal.fire("Éxito", "Mesa validada correctamente", "success");
      onQrDetected(data);
      onClose();
    } catch (error) {
      console.error("Error al procesar el QR:", error);
      Swal.fire("Error", error.message || "No se pudo procesar el QR", "error");
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
