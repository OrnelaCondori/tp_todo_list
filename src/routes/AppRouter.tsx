import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen"
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/backlog" />} />
                <Route path="/backlog" element={<BacklogScreen />} />
                <Route path="/sprint/:sprintId" element={<SprintScreen />} />
            </Routes>
        </BrowserRouter>
    )
}
