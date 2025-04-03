import { Header } from "../../ui/Header/Header"
import { ListSprint } from "../../ui/ListSprint/ListSprint"
import { ListTareasBacklog } from "../../ui/ListTareasBacklog/ListTareasBacklog"
import styles from "./BacklogScreen.module.css"
export const BacklogScreen = () => {
    return (
        <div>
            <div className={styles.ContainerScreen}>
                <Header/>
                <ListSprint/>
                <ListTareasBacklog/>
            </div>
        </div>
    )
}
