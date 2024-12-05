import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const ScanQrModal = ({ isOpen, onClose, onQrDetected }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const constraints = {
          video: {
            facingMode: { exact: "environment" }, // Intenta abrir la cámara trasera
          },
        };

        // Si no se puede abrir la cámara trasera, usar la predeterminada
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setError(null);
      } catch (err) {
        console.warn("Cámara trasera no disponible, usando cámara predeterminada.", err);
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play();
          setError(null);
        } catch (error) {
          console.error("No se pudo acceder a la cámara: ", error);
          setError("No se pudo acceder a ninguna cámara. Por favor, verifica tus permisos.");
        }
      }
    };

    if (isOpen) {
      startVideoStream();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const handleQrDetection = async () => {
    try {
      const qrContent = prompt("Escanea el QR o ingresa el contenido JSON del QR para pruebas:");
      const response = await fetch("https://back-end-cafe-planta.vercel.app/dining_area/scan_qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qr_content: qrContent }),
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

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>Escanea el QR</h2>
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <video
              ref={videoRef}
              style={{
                transform: "scaleX(1)", // Evitar efecto espejo para cámaras frontales
                width: "100%",
                height: "auto",
              }}
            />
          )}
          <button
            className="btn btn-success mt-3"
            onClick={handleQrDetection}
            disabled={!!error}
          >
            Procesar QR
          </button>
        </div>
      </div>
    )
  );
};

export default ScanQrModal;
