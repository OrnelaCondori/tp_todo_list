import axios from "axios";
import {IBacklog, ITarea } from "../types/IInterfaces";

const API_URL = "http://localhost:3000/backlog"; 


export const putBacklog = async (tareas: ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(`${API_URL}`, {
            tareas: tareas,
        });
        return response.data;
    } catch (error) {
        console.error("error en putBacklog", error);
    }
}

