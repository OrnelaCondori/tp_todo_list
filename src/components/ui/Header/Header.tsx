import styles from "./Header.module.css"

export const Header = () => {
    return (
        <div className={styles.conteinerHeader}>
            <div className={styles.conteinerTitleHeader}>
                <h2 className={styles.titleHeader}>Kairos</h2>
            </div>
        </div>
    )
}
