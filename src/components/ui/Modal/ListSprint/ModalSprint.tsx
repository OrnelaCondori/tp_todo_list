import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { ISprint } from '../../../../types/IInterfaces'
import { sprintStore } from '../../../../store/sprintStore'
import { useSprint } from '../../../../hooks/useSprint'
import { object, string } from 'yup'

import styles from "./ModalSprint.module.css"

type IModal = {
    handleCloseModal: VoidFunction
}
const initialState: ISprint = {
    id: "",
    fechaInicio: "",
    fechaCierre: "",
    nombre: "",
    tareas: []
}

//las validaciones de yup
const sprintSchema = object({
    nombre: string()
        .required("El nombre es obligatorio")
        .min(1, "Debe tener al menos 1 carácter")
        .max(15, "No puede superar los 15 caracteres")
    ,fechaInicio: string()
        .required("La fehc ade inicio es obligatoria")
    ,fechaCierre: string()
        .required("La fecha de cierre es obligatoria")
        .test("is-after", "La fecha de cierre debe ser posterior a la de inicio", function (value) {
            const { fechaInicio } = this.parent;
            return new Date(value) > new Date(fechaInicio);
        }),
})
export const ModalSprint: FC<IModal> = ({handleCloseModal}) => {
    const sprintActiva = sprintStore((state) => state.sprintActiva)
    const setSprintActiva = sprintStore((state) => state.setSprintActiva)
    const { crearSprint, editarSprint } =useSprint()

    const [formValues, setFormValues] = useState<ISprint>(initialState)
    const [errors, setErrors] = useState<{ [key: string]: string }>({}) //Para guardar errores

    useEffect(() => {
        if (sprintActiva) setFormValues(sprintActiva)
    }, [])

    //manejo de inputs y select
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const updatedValues = { ...formValues, [name]: value }
        setFormValues(updatedValues)

        //valida en tiempo real el campo modificado
        try {
            await sprintSchema.validateAt(name, updatedValues)
            setErrors(prev => {
                const newErrors = { ...prev}
                delete newErrors[name]
                return newErrors
            })
        } catch (error: any) {
            setErrors(prev => ({ ...prev,[name]: error.message}))
        }
    }

    //guardar formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        //para validar todo el formulario
        try {
            await sprintSchema.validate(formValues, {abortEarly: false})

            if (sprintActiva) {
                editarSprint(formValues)
            } else {
                crearSprint({...formValues, id: new Date().toDateString() })
            }
            setSprintActiva(null)
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
                    <h3>{sprintActiva ? "Editar Sprint" : "Crear Sprint"} </h3>
                </div> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <input onChange={handleChange} value={formValues.nombre} type="text" autoComplete="off" placeholder="Ingrese el Titulo" name="nombre" />
                        {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
                        <label >Fecha inicio </label>
                        <input onChange={handleChange} value={formValues.fechaInicio} type="date" autoComplete="off" name="fechaInicio" />
                        {errors.fechaInicio && <p className={styles.error}>{errors.fechaInicio}</p>}
                        <label >Fecha cierre </label>
                        <input onChange={handleChange} value={formValues.fechaCierre} type="date" autoComplete="off" name="fechaCierre" />
                        {errors.fechaCierre && <p className={styles.error}>{errors.fechaCierre}</p>}
                    </div>
                    <div>
                        <button className={styles.closeBoton}onClick={handleCloseModal}>X</button>
                        <button className={styles.saveBoton}
                        type="submit">{sprintActiva ? "Editar Sprint" : "guardar"}</button>
                    </div>
                </form>               
            </div>
        </div>
    )
}
