import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";
import { useEffect, useState } from "react";
import { ISprint, ITarea } from "../../../types/IInterfaces";
import styles from "./TareasSprint.module.css"
import { CardTareaSprint } from "../CardTareaSprint/CardTareaSprint";
import { ModalTareaSprint } from "../Modal/TareaSprint/ModalTareaSprint";

export const SprintDetalle = () => {
    const { sprintId } = useParams(); //obtengo el ID de la URL

    const {getSprints, sprints} = useSprint();
    const [sprint, setSprint] = useState<ISprint | null>(null);
    const [tareaSeleccionada, setTareaSeleccionada] = useState<ITarea | null>(null);
    
    useEffect(() => {
        if (sprints.length === 0) {
            getSprints();
        }
    }, []);
    useEffect(() => {
        const foundSprint = sprints.find((s) => s.id === sprintId);
        setSprint(foundSprint || null);
    }, [sprints, sprintId]);

    //estado modal
    const [openModalTarea,setOpenModalTarea]=useState(false)
    //funcion que nos permite abrir el modal 
    const handleOpenModalEdit=(tarea:ITarea)=>{
        setTareaSeleccionada(tarea); 
        setOpenModalTarea(true)
    }
    //funcion que nos permite cerrar el modal
    const handleCloseModal=()=>{
        setOpenModalTarea(false)
    }


    if (!sprint) {
        return <h2>Cargando o Sprint no encontrada...</h2>;
    }


    return (
        <div className={styles.containerPrincipalSprint}>
            <div className={styles.conteinerContentSprint}>
                <div className={styles.titleContentSprint}>
                    <h2>{sprint.nombre}</h2>
                    <button onClick={() => {
                        setTareaSeleccionada(null);
                        setOpenModalTarea(true);
                    }}>Agregar Tarea</button>
                </div>
                <div className={styles.containerColumnaTareas}>
                    <div className={styles.columnaTareas}>
                        <h3 className={styles.tituloColumna}>Pendiente</h3>
                        <div className={styles.conteinerTareasCard}>
                            {sprint.tareas
                                .filter((t) => t.estado === "pendiente")
                                .map((tarea) => (
                                    <CardTareaSprint tarea={tarea} idSprint={sprint.id!} handleOpenModalEdit={handleOpenModalEdit} />
                                ))}
                        </div>
                    </div>
                    <div className={styles.columnaTareas}>
                        <h3 className={styles.tituloColumna}>En proceso</h3>
                        <div className={styles.conteinerTareasCard}>
                            {sprint.tareas
                                .filter((t) => t.estado === "en proceso")
                                .map((tarea) => (
                                    <CardTareaSprint tarea={tarea} idSprint={sprint.id!} handleOpenModalEdit={handleOpenModalEdit}/>
                                ))}
                        </div>
                    </div>
                    <div className={styles.columnaTareas}>
                        <h3 className={styles.tituloColumna}>Completadas</h3>
                        <div className={styles.conteinerTareasCard}>
                            {sprint.tareas
                                .filter((t) => t.estado === "completada")
                                .map((tarea) => (
                                    <CardTareaSprint tarea={tarea} idSprint={sprint.id!} handleOpenModalEdit={handleOpenModalEdit}/>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {openModalTarea && <ModalTareaSprint 
                idSprint={sprint.id!} 
                handleCloseModal= {handleCloseModal}
                tareaSeleccionada={tareaSeleccionada}/>}
        </div>
    );
    
}
