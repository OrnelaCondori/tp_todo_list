import { useEffect, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";

import styles from "./ListTareasBacklog.module.css"
import { getBacklogTareasController } from "../../../data/BacklogController";
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
export const ListTareasBacklog = () => {
    const [tareas, setTareas] = useState<ITarea[]>([]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const respuesta = await getBacklogTareasController();
                if (respuesta) {
                    setTareas(respuesta);
                }
            } catch (error) {
                console.error("error obteniendo tareas del backlog", error);
            }
        };
        fetchTareas();
    }, []);
    return (
        <div className={styles.containerPrincipalBacklog}>
            <div className={styles.conteinerContentBacklog}>
                <div className={styles.titlesContainerBacklog}>
                    <h2>Backlog</h2>
                    <h3>Tareas en el Backlog</h3>
                </div>
                <div className={styles.containerTareasBacklog}>
                    {tareas.length > 0 ? (
                        tareas.map((tarea) => (
                            <CardTareaBacklog key={tarea.id} tarea={tarea} />
                        ))
                    ) : (
                        <h3>No hay tareas en el backlog</h3>
                    )}
                </div>
                <div>
                    <button className={styles.buttonAddTareasBacklog}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
