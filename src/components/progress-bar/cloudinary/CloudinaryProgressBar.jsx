import React, { useContext, useEffect } from "react";
import { Context } from "../../store/context";

const CloudinaryProgressBar = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Obtener las estadísticas de Cloudinary al cargar el componente
        actions.fetchCloudinaryStats();
    }, [actions]);

    if (!store.cloudinaryStats) {
        return <p>Cargando estadísticas...</p>;
    }

    const { used_space, total_space, percentage_used } = store.cloudinaryStats;
    let progressColor = "bg-success"; // Verde por defecto

    if (percentage_used > 50 && percentage_used <= 80) {
        progressColor = "bg-warning"; // Amarillo
    } else if (percentage_used > 80) {
        progressColor = "bg-danger"; // Rojo
    }

    return (
        <div className="cloudinary-progress-bar">
            <p>
                Espacio usado: {used_space.toFixed(2)} GB / {total_space.toFixed(2)} GB
            </p>
            <div className="progress">
                <div
                    className={`progress-bar ${progressColor}`}
                    role="progressbar"
                    style={{ width: `${percentage_used}%` }}
                    aria-valuenow={percentage_used}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {percentage_used.toFixed(2)}%
                </div>
            </div>
        </div>
    );
};

export default CloudinaryProgressBar;
