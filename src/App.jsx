import MainPage from "./components/mainpage/MainPage";
import TrainingPage from "./components/trainingpage/TrainingPage";
import {AnimatePresence} from "framer-motion";
import {Route, Router, Routes, useLocation} from "react-router-dom";

function App() {
    const location = useLocation();

    return (
        <div>
            <AnimatePresence mode={"sync"} initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path={"/*"} element={<MainPage />} />
                    <Route path={"/training"} element={<TrainingPage/>}/>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;