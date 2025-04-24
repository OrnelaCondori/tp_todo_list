import React from "react";
import { ITarea } from "../../../../../types/IInterfaces";
import styles from "./DetalleTareaSprint.module.css";

interface DetalleTareaSprintProps {
    tarea: ITarea;
    onClose: () => void;
}

export const DetalleTareaSprint: React.FC<DetalleTareaSprintProps> = ({ tarea, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Detalle de Tarea en Sprint</h2>
                <p><strong>Título:</strong> {tarea.titulo}</p>
                <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>
                <p><strong>Estado:</strong> {tarea.estado}</p>

                <div className={styles.buttonContainer}>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};
