import { getBacklogTareasController, updateBacklogTareaController, createBacklogTareaController, deleteByIdBacklogTareaController } from "../data/BacklogController";
import { tareaStore } from "../store/tareaStore"
import {useShallow} from "zustand/shallow"
import { ITarea } from "../types/IInterfaces"
import Swal from "sweetalert2"

export const useTareas = () => {
    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea} = tareaStore(useShallow((state)=>({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea,
    })))

    const getTareas = async() => {
        const data = await getBacklogTareasController()
        if(data) setArrayTareas(data)
    }

    const crearTarea = async(nuevaTarea:ITarea) => {
        agregarNuevaTarea(nuevaTarea);
        try{
            await createBacklogTareaController(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success")
        } catch(error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.log("algo salio mal al crear la tarea", error)
        }
    }

    const putTareaEditar= async(tareaEditada:ITarea) => {
        const estadoPrevio = tareas.find((el)=> el.id === tareaEditada.id)

        editarUnaTarea(tareaEditada)

        try {
            await updateBacklogTareaController(tareaEditada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) editarUnaTarea(estadoPrevio);
            console.log('Algo salio mal al editar')
        }
    }

    const eliminarTarea= async(idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea);

        const confirm = await Swal.fire({
            title: 'Estas seguro?',
            text: 'Esta acción eliminará la tarea permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        })
        if(!confirm.isConfirmed) return;

        eliminarUnaTarea(idTarea);
        try {
            await deleteByIdBacklogTareaController(idTarea);
            Swal.fire('Eliminado!', 'La tarea ha sido eliminada','success');
        } catch {
            if(estadoPrevio) agregarNuevaTarea(estadoPrevio);
            console.log('Algo salio mal al editar');
        }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas,
    }
}