import axios from "axios";
import { ITarea } from "../types/IInterfaces";
import { putBacklog } from "../http/Backlog";

const API_URL = "http://localhost:3000/backlog"; 

// Función para obtener todas las tareas del backlog
export const getBacklogTareasController = async (): Promise<ITarea[] | undefined> => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
        return response.data.tareas;
    } catch (error) {
        console.log("Problemas en getBacklogTareasController", error);

    }
};

// Función para crear una nueva tarea en el backlog
export const createBacklogTareaController = async (tareaNueva: ITarea) => {
    try {
        // Obtiene el backlog actual
        const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    
        // Agrega la nueva tarea al array de tareas
        const nuevasTareas = [...response.data.tareas, tareaNueva];

        if (response) {
            await putBacklog(nuevasTareas);
        } else {
            await putBacklog([tareaNueva]);
        }

        return tareaNueva;
    } catch (error) {
        console.log("Error en createBacklogTareaController", error);
    }
};

// Función para actualizar una tarea existente en el backlog
export const updateBacklogTareaController = async (tareaActualizada: ITarea) => {
    try {
        const tareasBd = await getBacklogTareasController();

        if (tareasBd) {
            const result = tareasBd.map((tareaBd) =>
                tareaBd.id === tareaActualizada.id
                    ? { ...tareaBd, ...tareaActualizada }
                    : tareaBd
            );

            await putBacklog(result);
        }
        return tareaActualizada;
    } catch (error) {
        console.error("Error en updateBacklogTareaController", error);
    }
};

// Función para eliminar una tarea por su ID
export const deleteByIdBacklogTareaController = async (idTareaAEliminar: string) => {
    try {
        const tareasBd = await getBacklogTareasController();

        if (tareasBd) {
            const result = tareasBd.filter(
                (tareaBd) => tareaBd.id !== idTareaAEliminar
            );

            await putBacklog(result);
        }
    } catch (error) {
        console.log("Error en deleteBacklogTareaController", error);
    }
};