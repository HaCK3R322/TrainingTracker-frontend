import React, {useEffect, useState} from 'react';
import MainPage from "./components/MainPage";
import './css/app.css'
import TrainingPage from "./components/TrainingPage";
import {fetchGetAllExercisesByTrainingId} from "./api/Exercises";
import {fetchGetAllTrainings} from "./api/Trainings";
import {AnimatePresence} from "framer-motion";
import {createBrowserRouter, Routes, useLocation, Route} from "react-router-dom";
import Training from "./api/entities/Training";
import training from "./api/entities/Training";


const App: React.FC = () => {
    const location = useLocation();

    const [trainings, setTrainings] = useState<Training[]>([])

    useEffect(() => {
        fetchGetAllTrainings()
            .then(data => {
                setTrainings(data as Training[])
            })
    }, [])

    return (
        <div className="App" id='App' style={{position: "absolute", width: '100%', height: '100%'}}>
            <AnimatePresence mode={"sync"}>
                <Routes location={location} key={location.pathname}>
                    <Route index element={<MainPage trainings={trainings}/>} />
                    <Route index path={"/training/:trainingId"} element={<TrainingPage/>}/>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
