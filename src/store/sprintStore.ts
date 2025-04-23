import { create } from "zustand";
import { ISprint } from "../types/IInterfaces";


interface ISprintStore{
    sprints:ISprint[]
    sprintActiva:ISprint| null
    setSprintActiva:(sprintActiva:ISprint| null)=>void
    setArraySprints:(arrayDeSprint:ISprint[])=>void
    agregarNuevaSprint:(nuevaSprint:ISprint)=>void
    editarSprint:(SprintActualizada:ISprint)=>void
    eliminarSprint:(idSprint:string)=>void
}

export const sprintStore= create<ISprintStore>((set)=>({
        sprints:[],
        sprintActiva:null,

        //FUNCIONES MODIFICADORAS
        setArraySprints:(arrayDeSprint)=>set(()=>({sprints:arrayDeSprint})),
        agregarNuevaSprint:(nuevaSprint)=>set((state)=>({sprints: [...state.sprints, nuevaSprint] })),
        editarSprint:(sprintEditada)=>
        set((state)=>{ 
            const arregloSprints=state.sprints.map((sprint)=>
            sprint.id===sprintEditada.id ?{...sprint,...sprintEditada}:sprint)
            return{sprints:arregloSprints}
        }),
        eliminarSprint:(idSprint)=>
            set((state)=>{                                      
            const arregloSprints=state.sprints.filter((sprint)=>sprint.id!==idSprint)
            return{sprints:arregloSprints} 
        }),
        //setear la tarea activa
        setSprintActiva:(sprintActivaIn)=>set(()=>({sprintActiva:sprintActivaIn}))
}))