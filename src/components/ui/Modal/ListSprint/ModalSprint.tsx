import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { ISprint } from '../../../../types/IInterfaces'
import { sprintStore } from '../../../../store/sprintStore'
import { useSprint } from '../../../../hooks/useSprint'

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
export const ModalSprint: FC<IModal> = ({handleCloseModal}) => {
    const sprintActiva = sprintStore((state) => state.sprintActiva)
    const setSprintActiva = sprintStore((state) => state.setSprintActiva)
    const { crearSprint, editarSprint } =useSprint()

    const [formValues, setFormValues] = useState<ISprint>(initialState)

    useEffect(() => {
        if (sprintActiva) setFormValues(sprintActiva)
    }, [])

    //manejo de inputs y select
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    //guardar formulario
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (sprintActiva) {
            editarSprint(formValues)
        } else {
            crearSprint({...formValues, id: new Date().toDateString() })
        }
        setSprintActiva(null)
        handleCloseModal()
    }
    
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div>
                    <h3>{sprintActiva ? "Editar Sprint" : "Crear Sprint"} </h3>
                </div> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <input onChange={handleChange} value={formValues.nombre} type="text" required autoComplete="off" placeholder="Ingrese el Titulo" name="nombre" />
                        <label >Fecha inicio </label>
                        <input onChange={handleChange} value={formValues.fechaInicio} type="date" required autoComplete="off" name="fechaInicio" />
                        <label >Fecha cierre </label>
                        <input onChange={handleChange} value={formValues.fechaCierre} type="date" required autoComplete="off" name="fechaCierre" />
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
