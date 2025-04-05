import React from "react";
import { ITarea } from "../../../../../types/IInterfaces"
import styles from "./DetalleTareaBacklog.module.css";

interface DetalleTareaBacklogProps {
    tarea: ITarea;
    onClose: () => void;
}

export const DetalleTareaBacklog: React.FC<DetalleTareaBacklogProps> = ({tarea, onClose}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Detalle de Tarea</h2>
                <p><span>Titulo: </span>{tarea.titulo}</p>
                <p><span>Descripción: </span>{tarea.descripcion}</p>
                <p><span>Fecha límite: </span>{tarea.fechaLimite}</p>
                <p><span>Estado: </span>{tarea.estado}</p>
                <div>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}
