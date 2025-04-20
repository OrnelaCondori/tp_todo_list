import React from 'react'
import { ISprint } from '../../../../../types/IInterfaces'
import styles from "./DetalleSprint.module.css"
interface DetalleSprintProps {
    sprint: ISprint;
    onClose: () => void;
}
export const DetalleSprint: React.FC<DetalleSprintProps> = ({sprint, onClose}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Detalle Sprint</h2>
                <p><span><b>Titulo: </b></span>{sprint.nombre}</p>
                <p><span><b>Fecha inicio: </b></span>{sprint.fechaInicio}</p>
                <p><span><b>Fecha cierre: </b></span>{sprint.fechaCierre}</p>
                <div>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}
