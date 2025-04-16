import { createSprintController, deleteByIdSprintController, getAllSprintController, updateSprintController } from "../data/SprintController"
import { sprintStore } from "../store/sprintStore"
import {useShallow} from "zustand/shallow"
import { ISprint } from "../types/IInterfaces"
import Swal from "sweetalert2"

export const useSprint = () => {
    const {sprints, setArraySprints, agregarNuevaSprint, eliminarUnaSprint, editarUnaSprint} = sprintStore(useShallow((state) =>({
        sprints: state.sprints,
        setArraySprints: state.setArraySprints,
        agregarNuevaSprint: state.agregarNuevaSprint,
        eliminarUnaSprint: state.eliminarSprint,
        editarUnaSprint: state.editarSprint,
    })))

    const getSprints = async() => {
        const data = await getAllSprintController()
        if(data) setArraySprints(data)
    }

    const crearSprint = async(nuevaSprint: ISprint) => {
        agregarNuevaSprint(nuevaSprint);
        try{
            await createSprintController(nuevaSprint);
            Swal.fire("Exito", "Sprint creada correctamente", "success")
        } catch(error) {
            eliminarUnaSprint(nuevaSprint.id!)
            console.log("Algo salio mal al crear la sprint", error)
        }
    }

    const editarSprint = async(sprintEditada:ISprint) => {
        const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id)

        editarUnaSprint(sprintEditada)

        try {
            await updateSprintController(sprintEditada);
            Swal.fire("Exito", "Sprint actualizada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) editarUnaSprint(estadoPrevio);
            console.log("Algo salio mal al editar una sprint")
        }
    }

    const eliminarSprint = async(idSprint: string) => {
        const estadoPrevio = sprints.find((el) => el.id === idSprint);

        const confirm = await Swal.fire({
            title: 'Estas seguro?',
            text: 'Esta acción eliminará la sprint permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        })
        if(!confirm.isConfirmed) return;

        eliminarUnaSprint(idSprint);

        try {
            await deleteByIdSprintController(idSprint);
            Swal.fire('Eliminado!', 'La sprint ha sido eliminada','success');
        } catch {
            if(estadoPrevio) agregarNuevaSprint(estadoPrevio);
            console.log("Algo salio mal al eliminar una tarea");
        }
    }

    return {
        getSprints,
        crearSprint,
        editarSprint,
        eliminarSprint,
        sprints,
    }
}