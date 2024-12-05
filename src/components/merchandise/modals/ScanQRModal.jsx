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

  const handleQrDetection = () => {
    // Aquí puedes implementar un lector QR o enviar el stream para analizarlo.
    // Simularemos la detección de un QR.
    const simulatedQr = "mesa_id=1&cafe_id=5";
    onQrDetected(simulatedQr);
    onClose();
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
            Simular detección de QR
          </button>
        </div>
      </div>
    )
  );
};

export default ScanQrModal;
