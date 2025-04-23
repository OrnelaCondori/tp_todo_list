import axios from "axios";
import { ISprint } from "../types/IInterfaces";
import { putSprintList } from "../http/Sprint";

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