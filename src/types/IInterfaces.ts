// Interfaz que representa una tarea
export interface ITarea {
    id: string; // Identificador único de la tarea
    titulo: string; // Título de la tarea
    descripcion: string; // Descripción de la tarea
    estado: string; // Estado de la tarea (ej: pendiente, en progreso, completado)
    fechaLimite: string; // Fecha límite en formato "YYYY-MM-DD"
    }
    
  // Interfaz que representa el backlog
export interface IBacklog {
    tareas: ITarea[]; // Lista de tareas en backlog
}
    
  // Interfaz que representa un sprint
export interface ISprint {
    id: string; // Identificador único del sprint
    fechaInicio: string; // Fecha de inicio del sprint en formato "YYYY-MM-DD"
    fechaCierre: string; // Fecha de cierre del sprint en formato "YYYY-MM-DD"
    nombre: string; // Nombre del sprint
    tareas: ITarea[]; // Lista de tareas dentro del sprint
}
    
  // Interfaz que representa la lista de sprints
export interface ISprintList {
    sprints: ISprint[]; // Lista de sprints
}
    
    // Interfaz principal que representa toda la estructura de la base de datos
export interface IDatabase {
    backlog: IBacklog; // Sección de backlog
    sprintList: ISprintList; // Sección de lista de sprints
}
