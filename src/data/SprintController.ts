import axios from "axios";
import { ISprint, ITarea } from "../types/IInterfaces";
import { putSprintList } from "../http/Sprint";
import { createBacklogTareaController } from "./BacklogController";

const API_URL = "http://localhost:3000/sprintList"; 

//funciona para obtener las sprint de ListSprint
export const getAllSprintController = async (): Promise<ISprint[] | undefined> => {
    try {
        const response = await axios.get<{ sprints : ISprint[] }>(API_URL);
        return response.data.sprints
    } catch (error) {
        console.log("Problemas en getAllSprintController", error)
    }
}

//Funcion para crear una nueva sprint
export const createSprintController = async (sprintNueva : ISprint) => {
    try {
        const sprints = await getAllSprintController();
        
        if (sprints) {
            await putSprintList([...sprints, sprintNueva]);
        } else {
            await putSprintList([sprintNueva]);
        }
        return sprintNueva;
    } catch (error) {
        console.log("Error en createSprintController", error);
    }
}
//funcion pra actualizar una sprint existente
export const updateSprintController = async (sprintActualizada: ISprint) => {
    try {
        const sprints = await getAllSprintController();

        if(sprints) {
            const result = sprints.map((sprint) => 
            sprint.id === sprintActualizada.id ?
            {...sprint,...sprintActualizada}: sprint );

            await putSprintList(result);
        }
        return sprintActualizada;
    } catch (error) {
        console.log("Error en updateSprintController", error);
    }
}
//funcion para eliminar una sprint
export const deleteByIdSprintController = async (idSprintEliminar : string) => {
    try {
        const sprints = await getAllSprintController();

        if(sprints) {
            const result = sprints.filter(
                (sprint) => sprint.id !== idSprintEliminar 
            );
            await putSprintList(result);
        }
    } catch (error) {
        console.log("Error en deleteByIdSprintController", error);
    }
}

export const addTaskToSprintController = async (idSprint: string, nuevaTarea: ITarea) => {
    try {
        const sprints = await getAllSprintController();

        if (sprints) {
            const sprintsActualizadas = sprints.map((sprint) => {
                if (sprint.id === idSprint) {
                    return {
                        ...sprint,
                        tareas: [...sprint.tareas, nuevaTarea],
                    };
                }
                return sprint;
            });

            await putSprintList(sprintsActualizadas);
            return nuevaTarea;
        }
    } catch (error) {
        console.log("Error en addTaskToSprintController", error);
    }
};

export const updateTaskToSprintController = async (idSprint: string, tareaActualizada: ITarea) => {
    try {
        const sprints = await getAllSprintController();

        if (sprints) {
            const sprintsActualizadas = sprints.map((sprint) => {
                if (sprint.id === idSprint) {
                    const tareasActualizadas = sprint.tareas.map((tarea) =>
                        tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
                    );
                    return { ...sprint, tareas: tareasActualizadas };
                }
                return sprint;
            });

            await putSprintList(sprintsActualizadas);
            return tareaActualizada;
        }
    } catch (error) {
        console.log("Error en updateTaskToSprintController", error);
    }
};

export const deleteTaskToSprintController = async (idSprint: string, idTarea: string) => {
    try {
        const sprints = await getAllSprintController();

        if (sprints) {
            const sprintsActualizadas = sprints.map((sprint) => {
                if (sprint.id === idSprint) {
                    const tareasFiltradas = sprint.tareas.filter((tarea) => tarea.id !== idTarea);
                    return { ...sprint, tareas: tareasFiltradas };
                }
                return sprint;
            });
            await putSprintList(sprintsActualizadas);
        }
    } catch (error) {
        console.log("Error en deleteTaskToSprintController", error);
    }
};

//función para enviar una tarea al backlog
export const sendTaskToBacklogController = async (idTarea: string) => {
    try {
        const sprints = await getAllSprintController();
        if(sprints) {
            let tareaEncontrada: ITarea |undefined;

            const sprintsActualizadas = sprints.map((sprint) => {
                const contieneTarea = sprint.tareas.some((t) => t.id === idTarea);

                if(contieneTarea) {
                    tareaEncontrada = sprint.tareas.find((t) => t.id === idTarea);
                    const tareasFiltradas = sprint.tareas.filter((t) => t.id !== idTarea)
                    return {...sprint, tareas: tareasFiltradas};
                }

                return sprint;
            })

            //si encuentra la tarea la agrega al backlog
            if(tareaEncontrada) {
                await putSprintList(sprintsActualizadas)
                await createBacklogTareaController(tareaEncontrada);
            }
        }
    } catch (error) {
        console.log("Error en sendTaskToBacklogController", error)
    }
}
