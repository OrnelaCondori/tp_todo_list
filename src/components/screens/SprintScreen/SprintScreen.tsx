
import { Header } from "../../ui/Header/Header"
import { ListSprint } from "../../ui/ListSprint/ListSprint"
import { SprintDetalle } from "../../ui/TareasSprint/TareasSprint"
import styles from "./SprintScreen.module.css"


export const SprintScreen = () => {
    return (
        <div className={styles.ContainerScreen}>
            <Header/>
            <ListSprint/>
            <SprintDetalle />
        </div>
    )
}