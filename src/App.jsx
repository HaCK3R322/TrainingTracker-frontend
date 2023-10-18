import MainPage from "./components/mainpage/MainPage";
import TrainingPage from "./components/trainingpage/TrainingPage";
import {useEffect} from "react";
import Swiper from "swiper";
import {AnimatePresence} from "framer-motion";
import {Route, Router, Routes, useLocation} from "react-router";

function App() {
    const location = useLocation();

    return (
        <div>
            <AnimatePresence mode={"sync"} initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path={"/*"} element={<MainPage />} />
                    <Route path={"/training/"} element={<TrainingPage/>}/>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
