import { addTaskToSprintController, createSprintController, deleteByIdSprintController, deleteTaskToSprintController, getAllSprintController, updateSprintController, updateTaskToSprintController } from "../data/SprintController"
import { sprintStore } from "../store/sprintStore"
import {useShallow} from "zustand/shallow"
import { ISprint , ITarea} from "../types/IInterfaces"
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

    const crearTareaInSprint = async (idSprint: string, nuevaTarea: ITarea) => {
        try {
            await addTaskToSprintController(idSprint, nuevaTarea);
            const sprintActualizada = sprints.find((s) => s.id === idSprint);
            if (sprintActualizada) {
                editarUnaSprint({
                ...sprintActualizada,
                tareas: [...sprintActualizada.tareas, nuevaTarea],
                });
            }
            Swal.fire("¡Éxito!", "Tarea agregada correctamente", "success");
        } catch (error) {
            console.error("Error al crear la tarea", error);
            Swal.fire("Error", "No se pudo crear la tarea", "error");
        }
    };
    const updateTaskInSprint = async (idSprint: string, tareaActualizada: ITarea) => {
        try {
            await updateTaskToSprintController(idSprint, tareaActualizada);
            const sprintActualizada = sprints.find((s) => s.id === idSprint);
            if (sprintActualizada) {
                const tareasActualizadas = sprintActualizada.tareas.map((t) =>
                t.id === tareaActualizada.id ? tareaActualizada : t
                );
                editarUnaSprint({ ...sprintActualizada, tareas: tareasActualizadas });
            }
            Swal.fire("¡Éxito!", "Tarea actualizada correctamente", "success");
        } catch (error) {
            console.error("Error al actualizar la tarea", error);
            Swal.fire("Error", "No se pudo actualizar la tarea", "error");
        }
    };
    const deleteTaskInSprint = async (idSprint: string, idTarea: string) => {
        try {
            await deleteTaskToSprintController(idSprint, idTarea);
            const sprintActualizada = sprints.find((s) => s.id === idSprint);
            if (sprintActualizada) {
                const tareasFiltradas = sprintActualizada.tareas.filter((t) => t.id !== idTarea);
                editarUnaSprint({ ...sprintActualizada, tareas: tareasFiltradas });
            }
            Swal.fire("¡Éxito!", "Tarea eliminada correctamente", "success");
        } catch (error) {
            console.error("Error eliminando la tarea:", error);
            Swal.fire("Error", "Hubo un problema al eliminar la tarea", "error");
        }
    };

    return {
        getSprints,
        crearSprint,
        editarSprint,
        eliminarSprint,
        crearTareaInSprint,
        updateTaskInSprint,
        deleteTaskInSprint,
        sprints,
    }
}