import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../../store/tareaStore"
import styles from "./ModalTareaSprint.module.css"
import { ITarea } from "../../../../types/IInterfaces"
import { useSprint } from "../../../../hooks/useSprint"
import { object, string } from 'yup'

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

const tareaSprintSchema = object({
    titulo: string()
        .required("El título es obligatorio")
        .min(1, "Debe tener al menos 1 carácter")
        .max(17, "No puede superar los 17 caracteres"),
    descripcion: string()
        .required("La descripción es obligatoria")
        .max(100, "No puede superar los 100 catacteres"),
    fechaLimite: string()
        .required("La fecha de cierre es obligatoria"),
    estado: string()
        .required("El estado es obligatorio")
        .oneOf(["pendiente", "en proceso", "completada"], "Estado no válido")
})

export const ModalTareaSprint: FC<IModal> = ({ handleCloseModal, idSprint, tareaSeleccionada }) => {
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const { crearTareaInSprint, updateTaskInSprint } = useSprint()
    const [formValues, setFormValues] = useState<ITarea>(initialState)

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (tareaSeleccionada) {
            setFormValues(tareaSeleccionada)
        } else {
            setFormValues(initialState)
        }
    }, [tareaSeleccionada])

        // Manejo de inputs y select
        const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target
            const updatedValues = { ...formValues, [name]: value }
            setFormValues(updatedValues)

            //valida el campo
            try {
                await tareaSprintSchema.validateAt(name, updatedValues)
                setErrors(prev => {
                    const newErrors = { ...prev}
                    delete newErrors[name]
                    return newErrors
                })
            } catch (error: any) {
                setErrors(prev => ({ ...prev, [name]: error.message }))
            }
        }

        // Guardar formulario
        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault()

            //validamos todo el fomnulario
            try {
                await tareaSprintSchema.validate(formValues, {abortEarly: false})
                
                if (tareaSeleccionada && idSprint) {
                    updateTaskInSprint(idSprint, formValues);
                } else {
                    crearTareaInSprint(idSprint, { ...formValues });
                }
                setTareaActiva(null)
                handleCloseModal()
            } catch (error: any) {
                if (error.inner) {
                    const formErrors: { [key: string]: string } = {}
                    error.inner.forEach((error: any) => {
                        formErrors[error.path] = error.message
                    })
                    setErrors(formErrors)
                }
            }
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
                            type="text" autoComplete="off" placeholder="Ingrese el Titulo" name="titulo"
                        />
                        {errors.titulo && <p className={styles.error}>{errors.titulo}</p>}
                        <textarea
                            onChange={handleChange} value={formValues.descripcion} placeholder="Ingrese una descripción" name="descripcion"
                        />
                        {errors.descripcion && <p className={styles.error}>{errors.descripcion}</p>}
                        <input
                            onChange={handleChange} value={formValues.fechaLimite}
                            type="date" autoComplete="off" name="fechaLimite"
                        />
                        {errors.fechaLimite && <p className={styles.error}>{errors.fechaLimite}</p>}
                        <select className={styles.selectEstado}
                            name="estado"
                            value={formValues.estado} onChange={handleChange}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en proceso">En Proceso</option>
                            <option value="completada">Completada</option>
                        </select>
                        {errors.estado && <p className={styles.error}>{errors.estado}</p>}
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
