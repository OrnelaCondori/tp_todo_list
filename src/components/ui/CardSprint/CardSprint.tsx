import { FC, useState } from 'react';
import { ISprint } from '../../../types/IInterfaces';
import { useSprint } from '../../../hooks/useSprint';

import styles from "./CardSprint.module.css";
import { DetalleSprint } from '../Modal/ListSprint/SprintDetalle/DetalleSprint';

type ICardSprint = {
    sprint: ISprint;
    handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<ICardSprint> = ({ sprint, handleOpenModalEdit }) => {
    const { eliminarSprint } = useSprint();
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const deleteSprint = () => {
        eliminarSprint(sprint.id);
        setMostrarMenu(false);
    };

    const editarSprint = () => {
        handleOpenModalEdit(sprint);
        setMostrarMenu(false);
    };

    const verDetalle = () => {
        setMostrarDetalle(true);
        setMostrarMenu(false);
    };

    return (
        <>
            <div className={styles.constainerSprintCard}>
                <div className={styles.textSprintCard}>
                    <p>{sprint.nombre}</p>
                    <span
                        className="material-symbols-outlined"
                        onClick={() => setMostrarMenu(!mostrarMenu)}
                    >
                        more_vert
                    </span>

                    {mostrarMenu && (
                        <div className={styles.menuDesplegable}>
                            <button onClick={verDetalle}>Ver detalle</button>
                            <button onClick={editarSprint}>Editar</button>
                            <button onClick={deleteSprint}>Eliminar</button>
                        </div>
                    )}
                </div>
            </div>

            {mostrarDetalle && (
                <DetalleSprint sprint={sprint} onClose={() => setMostrarDetalle(false)} />
            )}
        </>
    );
};
