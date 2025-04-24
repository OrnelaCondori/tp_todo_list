import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../../store/tareaStore"
import styles from "./ModalAgregarTarea.module.css"
import { ITarea } from "../../../../types/IInterfaces"
import { useTareas } from "../../../../hooks/useTarea"
import { object, string } from 'yup'

type IModal = {
  handleCloseModal: VoidFunction
}

const initialState: ITarea = {
  id: "",
  titulo: '',
  descripcion: '',
  fechaLimite: '',
  estado: "" // Estado inicial vacío
}

const tareaBacklogSchema = object({
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

export const ModalTarea: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva)
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)
  const { crearTarea, putTareaEditar } = useTareas()

  const [formValues, setFormValues] = useState<ITarea>(initialState)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva)
  }, [])

    // Manejo de inputs y select
  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updatedValues = { ...formValues, [name]: value }
    setFormValues(updatedValues)
    
    //valida el campo
    try {
      await tareaBacklogSchema.validateAt(name, updatedValues)
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

    //validamos todo el formulario
    try {
      await tareaBacklogSchema.validate(formValues, {abortEarly: false})
      
      if (tareaActiva) {
        putTareaEditar(formValues)
      } else {
        crearTarea({ ...formValues, id: new Date().toDateString() })
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
          <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"} </h3>
        </div>
        <form onSubmit={handleSubmit} >
          <div>
            <input onChange={handleChange} value={formValues.titulo} type="text" autoComplete="off" placeholder="Ingrese el Titulo" name="titulo" />
            {errors.titulo && <p className={styles.error}>{errors.titulo}</p>}

            <textarea onChange={handleChange} value={formValues.descripcion} placeholder="Ingrese una descripción" name="descripcion"></textarea>
            {errors.descripcion && <p className={styles.error}>{errors.descripcion}</p>}

            <input onChange={handleChange} value={formValues.fechaLimite} type="date" autoComplete="off" name="fechaLimite" />
            {errors.fechaLimite && <p className={styles.error}>{errors.fechaLimite}</p>}

              {/* Select para Estado */}
            <select className={styles.selectEstado} name="estado" value={formValues.estado} onChange={handleChange} >
              <option value="">Selecciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Proceso</option>
              <option value="completada">Completada</option>
            </select>
            {errors.estado && <p className={styles.error}>{errors.estado}</p>}
          </div>
          <div >
            <button className={styles.closeBoton}onClick={handleCloseModal}>X</button>
            <button className={styles.saveBoton}
              type="submit">{tareaActiva ? "Editar Tarea" : "guardar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
