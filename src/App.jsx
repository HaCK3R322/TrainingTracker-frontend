import MainPage from "./components/mainpage/MainPage";
import TrainingPage from "./components/trainingpage/TrainingPage";
import {AnimatePresence} from "framer-motion";
import {Route, Router, Routes, useLocation} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import React, {useState} from "react";
import {motion} from "framer-motion";


function App() {
    const location = useLocation();

    const [visibleCalendar, setVisibleCalendar] = useState(false);

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
