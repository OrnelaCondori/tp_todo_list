// import { useState } from "react";
// import { getBacklogTareas } from "../http/Backlog";
// import { ITarea } from "../types/IInterfaces";

// export const useBacklog = () => {
//     const [tareas, setTareas] = useState<ITarea[]>([]);

//     const getTareas = async () => {
//         try {
//             const data = await getBacklogTareas();
//             setTareas(data);
//         } catch (error) {
//             console.error("Error al obtener tareas del backlog", error);
//         }
//     };

//     return { tareas, getTareas }; // Asegúrate de retornar también la función getTareas
// };

