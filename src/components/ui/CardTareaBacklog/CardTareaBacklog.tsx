import { FC, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";

import styles from "./CardTareaBacklog.module.css";
import { useTareas } from "../../../hooks/useTarea";
import { DetalleTareaBacklog } from "../Modal/TareaBacklog/TareaBacklogDetalle/DetalleTareaBacklog";

type ICardTareaBacklog = {
    tarea: ITarea; // Definimos la propiedad tarea
    handleOpenModalEdit: (tarea: ITarea) => void;
}

export const CardTareaBacklog: FC<ICardTareaBacklog> = ({tarea, handleOpenModalEdit }) => {

    const { eliminarTarea } = useTareas();
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const deleteTarea = () => {
        eliminarTarea(tarea.id!);
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    }
    const verDetalle = () => {
        setMostrarDetalle(true);
    }

    return (
        <>
            <div className={styles.containerTareasCard}>
                <div className={styles.textTareasCard}>
                    <p className={styles.titleTareasCard}><b>{tarea.titulo}</b></p>
                    <p>Descripcion: {tarea.descripcion}</p>
                </div>
                <div className={styles.buttonsTareasCard}>
                    <button>Enviar a</button>
                    <select name="Sprint"required className={styles.buttonCardGris}>
                        <option value="">Selecciona una Sprint</option>
                        <option value="">Pendiente</option>
                        <option value="">En proceso</option>
                        <option value="">Terminada</option>
                    </select>
                    <button onClick={editarTarea} className={styles.buttonCardActions}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={verDetalle} className={styles.buttonCardActions}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button onClick={deleteTarea} className={styles.buttonDelete}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>

            {mostrarDetalle && (
                <DetalleTareaBacklog tarea={tarea} onClose={() => setMostrarDetalle(false)} />
            )}
        </>
    )
}
