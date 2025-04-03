
import { ITarea } from "../../../types/IInterfaces";

import styles from "./CardTareaBacklog.module.css";

interface CardTareaBacklogProps {
    tarea: ITarea; // Definimos la propiedad tarea
}

export const CardTareaBacklog = ({tarea}: CardTareaBacklogProps) => {
    return (
        <div className={styles.containerTareasCard}>
            <div className={styles.textTareasCard}>
                <p className={styles.titleTareasCard}><b>{tarea.titulo}</b></p>
                <p>Descripcion: {tarea.descripcion}</p>
            </div>
            <div className={styles.buttonsTareasCard}>
                <button>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button>
                    <span className="material-symbols-outlined">visibility</span>
                </button>
                <button className={styles.buttonDelete}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    )
}
