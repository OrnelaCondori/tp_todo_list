import { FC, useEffect, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";

import styles from "./CardTareaBacklog.module.css";
import { useTareas } from "../../../hooks/useTarea";
import { DetalleTareaBacklog } from "../Modal/TareaBacklog/TareaBacklogDetalle/DetalleTareaBacklog";
import { useSprint } from "../../../hooks/useSprint";
import { addTaskToSprintController } from "../../../data/SprintController";
import { deleteByIdBacklogTareaController } from "../../../data/BacklogController";
import Swal from "sweetalert2";

type ICardTareaBacklog = {
    tarea: ITarea; // Definimos la propiedad tarea
    handleOpenModalEdit: (tarea: ITarea) => void;
    refreshTareas: () => void;
}

export const CardTareaBacklog: FC<ICardTareaBacklog> = ({tarea, handleOpenModalEdit, refreshTareas }) => {

    const { eliminarTarea } = useTareas();
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const { getSprints, sprints } = useSprint(); // Traemos sprints
    const [sprintSeleccionada, setSprintSeleccionada] = useState<string>("");

    const deleteTarea = () => {
        eliminarTarea(tarea.id!);
        refreshTareas();
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    }
    const verDetalle = () => {
        setMostrarDetalle(true);
    }
    const enviarTareaSprint = async () => {
        const confirm = await Swal.fire({
            title: '¿Mover a Sprint?',
            text: 'La tarea será enviada al sprint y removida del backlog',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, mover',
            cancelButtonText: 'Cancelar'
        });
        if (!confirm.isConfirmed) return;
    
        try {
            if(!sprintSeleccionada) {
                Swal.fire("Selecciona una Sprint antes");
                return;
            }
            await addTaskToSprintController(sprintSeleccionada, tarea)
            await deleteByIdBacklogTareaController(tarea.id!)
            refreshTareas();
            eliminarTarea(tarea.id!)  //actualiza el estado local
            Swal.fire("¡Éxito!", "Tarea movida a la Sprint", "success");
        } catch (error) {
            console.error("Error al enviar la tarea a la Sprint", error);
            Swal.fire("Error", "No se pudo enviar la tarea a la sprint", "error");
        }
    }

    // Cuando se monta el componente, traemos los sprints
    useEffect(() => {
        getSprints();
    }, []);

    return (
        <>
            <div className={styles.containerTareasCard}>
                <div className={styles.textTareasCard}>
                    <p className={styles.titleTareasCard}><b>{tarea.titulo}</b></p>
                    <p>Descripcion: {tarea.descripcion}</p>
                </div>
                <div className={styles.buttonsTareasCard}>
                    <button onClick={enviarTareaSprint}>Enviar a</button>
                    <select name="Sprint"required className={styles.buttonCardGris}
                    value={sprintSeleccionada} onChange={(e) => setSprintSeleccionada(e.target.value)
                    }>
                        <option value="">Selecciona una Sprint</option>
                            {sprints.map((sprint) => (
                                <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                            ))}
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
