
import styles from "./ListSprint.module.css"

export const ListSprint = () => {
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
                        <h3>No hay Sprints</h3>
                    </div>
                    <div>
                        <button>+</button>
                    </div>
            </div>
        </div>
    </div>
)
}
