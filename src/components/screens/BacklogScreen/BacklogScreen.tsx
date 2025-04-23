import { Header } from "../../ui/Header/Header"
import { ListSprint } from "../../ui/ListSprint/ListSprint"
import { TareasBacklog } from "../../ui/TareasBacklog/TareasBacklog"
import styles from "./BacklogScreen.module.css"
export const BacklogScreen = () => {
    return (
        <div>
            <div className={styles.ContainerScreen}>
                <Header/>
                <ListSprint/>
                <TareasBacklog/>
            </div>
        </div>
    )
}


