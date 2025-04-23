import axios from "axios"
import { ISprint, ISprintList} from "../types/IInterfaces"

const API_URL = "http://localhost:3000/sprintList"; 

export const putSprintList = async (sprints: ISprint[]) => {
    try {
        const response = await axios.put<ISprintList>(`${API_URL}`, {
            sprints : sprints
        })
        return response.data
    } catch (error) {
        console.log("Error en putSprint", error);
    }
}

export const getSprintPorId = async (id: string) => {
    const response = await axios.get(`${API_URL}/sprints/${id}`)
    return response.data
}
