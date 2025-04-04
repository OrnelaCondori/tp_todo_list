import { useEffect, useState } from "react";
import { ITarea } from "../../../types/IInterfaces";
import styles from "./ListTareasBacklog.module.css";
import { getBacklogTareasController} from "../../../data/BacklogController";
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
import ModalTareas from "../Modal/ModalTareas"

export const ListTareasBacklog = () => {
const [tareas, setTareas] = useState<ITarea[]>([]);
const [mostrarModal, setMostrarModal] = useState(false);

useEffect(() => {
    const fetchTareas = async () => {
    try {
        const respuesta = await getBacklogTareasController();
        if (respuesta) setTareas(respuesta);
    } catch (error) {
        console.error("Error obteniendo tareas del backlog", error);
    }
    };
    fetchTareas();
}, []);

const handleAgregarTarea = async (titulo: string, descripcion: string) => {
    const nuevaTarea: ITarea = {
        id: Date.now().toString(), // solo temporal si no usás backend real
        titulo,
        descripcion,
        estado: "backlog",
        fechaLimite: ""
    };

    try {
    await addTareaController(nuevaTarea);
    setTareas([...tareas, nuevaTarea]) 
    } catch (error) {
    console.error("Error al agregar tarea", error);
    }
};

return (
    <div className={styles.containerPrincipalBacklog}>
        <div className={styles.conteinerContentBacklog}>
            <div className={styles.titlesContainerBacklog}>
            <h2>Backlog</h2>
            <h3>Tareas en el Backlog</h3>
            </div>

            <div className={styles.containerTareasBacklog}>
            {tareas.length > 0 ? (
                tareas.map((tarea) => <CardTareaBacklog key={tarea.id} tarea={tarea} />)
            ) : (
                <h3>No hay tareas en el backlog</h3>
            )}
            </div>

            <div>
            <button
                className={styles.buttonAddTareasBacklog}
                onClick={() => setMostrarModal(true)}
            >
                <span className="material-symbols-outlined">add</span>
            </button>
            </div>

            <ModalTareas
            isOpen={mostrarModal}
            onClose={() => setMostrarModal(false)}
            onSave={handleAgregarTarea}
            />
        </div>
    </div>
);
};
function addTareaController(_nuevaTarea: ITarea) {
    throw new Error("Function not implemented.");
}

