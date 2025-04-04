import styles from "./Header.module.css"

export const Header = () => {
    return (
        <div className={styles.conteinerHeader}>
            <div className={styles.conteinerTitleHeader}>
                <h1 className={styles.titleHeader}>Kairos</h1>
            </div>
        </div>
    )
}
