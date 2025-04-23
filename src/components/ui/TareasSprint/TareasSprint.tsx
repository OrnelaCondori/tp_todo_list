import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/IInterfaces";
import styles from "./TareasSprint.module.css"

export const SprintDetalle = () => {
    const { sprintId } = useParams(); //obtengo el ID de la URL

    const {getSprints, sprints} = useSprint();
    const [sprint, setSprint] = useState<ISprint | null>(null);
    
    useEffect(() => {
        if (sprints.length === 0) {
            getSprints();
        }
    }, []);
    useEffect(() => {
        const foundSprint = sprints.find((s) => s.id === sprintId);
        setSprint(foundSprint || null);
    }, [sprints, sprintId]);

    if (!sprint) {
        return <h2>Cargando o Sprint no encontrada...</h2>;
    }

    // Agrupar tareas por estado
    const tareasPendientes = sprint.tareas.filter((tarea) => tarea.estado === "pendiente");
    const tareasEnProgreso = sprint.tareas.filter((tarea) => tarea.estado === "en proceso");
    const tareasCompletadas = sprint.tareas.filter((tarea) => tarea.estado === "completada");


    return (
        <div className={styles.containerPrincipalSprint}>
            <div>
                <div>
                    <h2>{sprint?.nombre}</h2>
                    <button>Agregar Tarea</button>
                </div>
                <div>
                    <div>
                        <h3>Pendiente</h3>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
