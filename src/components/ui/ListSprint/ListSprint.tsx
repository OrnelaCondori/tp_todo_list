import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore"
import styles from "./ListSprint.module.css"

import { useSprint } from "../../../hooks/useSprint"; // Hook para traer sprints
import { CardSprint } from "../CardSprint/CardSprint"; // Tarjeta para mostrar un sprint
import { ModalSprint } from "../Modal/ListSprint/ModalSprint"; // Modal para agregar o editar sprint
import { ISprint } from "../../../types/IInterfaces"; // Interfaz de Sprint

export const ListSprint = () => {
    const setSprintActiva = sprintStore((state) => state.setSprintActiva);
    const { getSprints, sprints } = useSprint(); // Traemos sprints
    const [openModalSprint, setOpenModalSprint] = useState(false);

    // Cuando se monta el componente, traemos los sprints
    useEffect(() => {
        getSprints();
    }, []);

    const handleOpenModalEdit = (sprint: ISprint) => {
        setSprintActiva(sprint);
        setOpenModalSprint(true);
    };
    const handleCloseModal = () => {
        setOpenModalSprint(false);
    };

    return (
        <div className={styles.containerPrincipalMenu}>
            <div className={styles.containerPrincipalBoton}>
                <div>
                    <button> Backlog </button>
                </div>
            </div>
            <div className={styles.containerPrincipalListSprint}>
                <div className={styles.containerTitleAndButton}>
                    <h2>Lista de Sprints</h2>
                </div>
                <div className={styles.containerSprint}>
                        <div>
                            {sprints.length > 0 ? (
                                sprints.map((sprint) => (
                                    <CardSprint
                                        key={sprint.id}
                                        sprint={sprint}
                                        handleOpenModalEdit={handleOpenModalEdit}
                                    />
                                ))
                            ) : (
                                <h3>No hay Sprints</h3>
                            )}
                        </div>
                        <div>
                            <button onClick={() => setOpenModalSprint(true)}>+</button>
                        </div>
                </div>
            </div>
            {openModalSprint && <ModalSprint handleCloseModal={handleCloseModal} />}
        </div>
    )
}
