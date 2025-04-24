import { useEffect, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";

import styles from "./TareasBacklog.module.css"
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { useTareas } from "../../../hooks/useTarea";
import { ModalTarea} from "../Modal/TareaBacklog/ModalAgregarTarea";
export const TareasBacklog = () => {

    //seteo tarea activa
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{getTareas,tareas}=useTareas()
    ///hacemos una resolucion de traer las tareas
    useEffect(()=>{
        getTareas()
    },[])
    //estado modal
    const [openModalTarea,setOpenModalTarea]=useState(false)
    //funcion que nos permite abrir el modal 
    const handleOpenModalEdit=(tarea:ITarea)=>{
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }
    //funcion que nos permite cerrar el modal
    const handleCloseModal=()=>{
        setOpenModalTarea(false)
    }
    const refreshTareas = () => {
        getTareas();
    };

    return (
        <>
        <div className={styles.containerPrincipalBacklog}>
            <div className={styles.conteinerContentBacklog}>
                <div className={styles.titlesContainerBacklog}>
                    <h3>Tareas en el Backlog</h3>
                </div>
                <div className={styles.containerTareasBacklog}>
                    {tareas.length > 0 ? (
                        tareas.map((tarea) => (
                            <CardTareaBacklog handleOpenModalEdit = {handleOpenModalEdit}
                            tarea={tarea}
                            refreshTareas={refreshTareas} />
                        ))
                    ) : (
                        <h3>No hay tareas en el backlog</h3>
                    )}
                </div>
                <div>
                    <button className={styles.buttonAddTareasBacklog} onClick={() =>{
                        setOpenModalTarea(true)
                    }}>
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>

        {openModalTarea && <ModalTarea handleCloseModal= {handleCloseModal}/>}
        </>
    )
}

