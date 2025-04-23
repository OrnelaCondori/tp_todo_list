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
                <p><span><b>Título: </b></span>{tarea.titulo}</p>
                <p><span><b>Descripción: </b></span>{tarea.descripcion}</p>
                <p><span><b>Fecha límite: </b></span>{tarea.fechaLimite}</p>
                <p><span><b>Estado: </b></span>{tarea.estado}</p>
                <div>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}
