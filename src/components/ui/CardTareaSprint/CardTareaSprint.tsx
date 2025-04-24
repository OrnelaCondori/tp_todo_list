import { FC, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";
import { tareaStore } from "../../../store/tareaStore";
import { useSprint } from "../../../hooks/useSprint";
import { DetalleTareaSprint } from "../Modal/TareaSprint/TareaSprintDetalle/DetalleTareaSprint"; 
import styles from "./CardTareaSprint.module.css"

type ICardTareaSprint = {
    tarea: ITarea;
    idSprint: string | undefined;
    handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTareaSprint: FC<ICardTareaSprint> = ({ tarea, idSprint, handleOpenModalEdit }) => {

    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const { deleteTaskInSprint, updateTaskInSprint, enviarTareaBacklog } = useSprint();

    const editarTarea = () => {
        setTareaActiva(tarea);
        handleOpenModalEdit(tarea);
    };

    const eliminarTarea = () => {
        if (idSprint) {
            deleteTaskInSprint(idSprint, tarea.id!);
        }
    };

    const verDetalle = () => {
        setTareaActiva(tarea);
        setMostrarDetalle(true);
    };

    //mover tarea de un estado a otro
    const cambiarEstadoTarea = () => {
        let nuevoEstado = "";
        switch (tarea.estado) {
            case "pendiente":
                nuevoEstado = "en proceso";
                break;
            case "en proceso":
                nuevoEstado = "completada";
                break;
            case "completada":
                nuevoEstado = "pendiente";
                break;
            default:
                nuevoEstado = "pendiente";
        }
        const tareaActualizada = {
            ...tarea,
            estado: nuevoEstado,
        };
        if (idSprint) {
            updateTaskInSprint(idSprint, tareaActualizada); 
        }
    };
    
    //formateo la fechaLimite para que de muestre el número de día y iniciales del mes
    const formatearDia = (fecha: string) => {
        const dia = new Date(fecha).getDate();
        return String(dia).padStart(2, '0');
    };
    const formatearMes = (fecha: string) => {
        return new Date(fecha).toLocaleString('es-ES', { month: 'short' });
    };
    

    return (
        <div>
            <div className={styles.containerTareaSprintCard}>
                <div className={styles.containerTituloTareaSprint}>
                    <div className={styles.containerFechaTarea}>
                        <span className={styles.fechaTareaDia}><b>{formatearDia(tarea.fechaLimite)}</b></span>
                        <span>{formatearMes(tarea.fechaLimite)}</span>
                    </div>
                    <div className={styles.tituloTareaSprint}>
                        <p><b>{tarea.titulo}</b></p>
                    </div>
                </div>
                <div className={styles.conteinerContentTareaSprintCard}>
                    <div className={styles.descripcionTareaSprintCard}>
                        <p>{tarea.descripcion}</p>
                    </div>
                    <div className={styles.botonesTareaSprintCard}>
                        <button 
                            onClick={() => enviarTareaBacklog(tarea.id, idSprint!)}
                        >Enviar a Backlog</button>
                        <button onClick={cambiarEstadoTarea}>
                            <span className="material-symbols-outlined">
                                double_arrow
                            </span>
                        </button>
                        <button onClick={verDetalle}>
                            <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button onClick={editarTarea}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={eliminarTarea}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {mostrarDetalle && (
                <DetalleTareaSprint
                    tarea={tarea}
                    onClose={() => setMostrarDetalle(false)}
                />
            )}
        </div>
    );
};

