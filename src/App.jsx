import MainPage from "./components/mainpage/MainPage";
import TrainingPage from "./components/trainingpage/TrainingPage";
import {AnimatePresence} from "framer-motion";
import {Route, Router, Routes, useLocation} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import test from "./api/test"


function App() {
    const location = useLocation();

    return (
        <div>
            <AnimatePresence mode={"sync"} initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path={"/*"} element={<MainPage />} />
                    <Route path={"/training/:trainingId"} element={<TrainingPage/>}/>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
