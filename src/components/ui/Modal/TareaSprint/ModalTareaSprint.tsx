import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../../store/tareaStore"
import styles from "./ModalTareaSprint.module.css"
import { ITarea } from "../../../../types/IInterfaces"
import { useSprint } from "../../../../hooks/useSprint"

type IModal = {
    handleCloseModal: VoidFunction
    idSprint: string
    tareaSeleccionada: ITarea | null
}

const initialState: ITarea = {
    id: "",
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: "pendiente" // Estado inicial vacío
}

export const ModalTareaSprint: FC<IModal> = ({ handleCloseModal, idSprint, tareaSeleccionada }) => {
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const { crearTareaInSprint, updateTaskInSprint } = useSprint()
    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect(() => {
        if (tareaSeleccionada) {
            setFormValues(tareaSeleccionada)
        } else {
            setFormValues(initialState)
        }
    }, [tareaSeleccionada])

        // Manejo de inputs y select
        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target
            setFormValues((prev) => ({ ...prev, [name]: value }))
        }

        // Guardar formulario
        const handleSubmit = (e: FormEvent) => {
            e.preventDefault()
            if (tareaSeleccionada && idSprint) {
                updateTaskInSprint(idSprint, formValues);
            } else {
                crearTareaInSprint(idSprint, { ...formValues });
            }
            setTareaActiva(null)
            handleCloseModal()
        }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div>
                    <h3>{tareaSeleccionada ? "Editar Tarea" : "Crear Tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <input
                            onChange={handleChange} value={formValues.titulo}
                            type="text" required autoComplete="off" placeholder="Ingrese el Titulo" name="titulo"
                        />
                        <textarea
                            onChange={handleChange} value={formValues.descripcion} placeholder="Ingrese una descripción" required name="descripcion"
                        />
                        <input
                            onChange={handleChange} value={formValues.fechaLimite}
                            type="date" required autoComplete="off" name="fechaLimite"
                        />
                        <select className={styles.selectEstado}
                            name="estado"
                            value={formValues.estado} onChange={handleChange} required
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en proceso">En Proceso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>
                    <div>
                        <button className={styles.closeBoton} onClick={handleCloseModal}>X</button>
                        <button className={styles.saveBoton} type="submit">
                            {tareaSeleccionada ? "Editar Tarea" : "Crear Tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
