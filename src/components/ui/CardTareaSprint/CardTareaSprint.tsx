import { FC, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";
import { tareaStore } from "../../../store/tareaStore";
import { useSprint } from "../../../hooks/useSprint";
import { DetalleTareaSprint } from "../Modal/TareaSprint/TareaSprintDetalle/DetalleTareaSprint"; 

type ICardTareaSprint = {
    tarea: ITarea;
    idSprint: string | undefined;
    handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTareaSprint: FC<ICardTareaSprint> = ({ tarea, idSprint, handleOpenModalEdit }) => {

    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const { deleteTaskInSprint, updateTaskInSprint } = useSprint();

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
    

    return (
        <div>
            <div>
                <div>
                    <p>{tarea.fechaLimite}</p>
                    <h3>{tarea.titulo}</h3>
                </div>
                <div>
                    <p>{tarea.descripcion}</p>
                </div>
                <div>
                    <button>Enviar a Backlog</button>
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

            {mostrarDetalle && (
                <DetalleTareaSprint
                    tarea={tarea}
                    onClose={() => setMostrarDetalle(false)}
                />
            )}
        </div>
    );
};

