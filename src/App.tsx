import React from 'react';
import MainPage from "./components/MainPage";
import './css/app.css'
import TrainingPage from "./components/TrainingPage";
import {fetchGetAllExercisesByTrainingId} from "./api/Exercises";
import {fetchGetAllTrainings} from "./api/Trainings";
import {AnimatePresence} from "framer-motion";
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
    {
        element: <MainPage/>,
        path: "/",
        loader:  async () => {
            return fetchGetAllTrainings()
        },
    },
    {
        element: <TrainingPage/>,
        path: "/training/:trainingId",
        loader: async (args) => {
            if(args.params.trainingId !== undefined) {
                let trainingId: number = parseInt(args.params.trainingId);
                return fetchGetAllExercisesByTrainingId(trainingId)
            } else {
                throw new Error('params.trainingId in router loader is undefined!')
            }
        }
    }
])

const App: React.FC = () => {
  return (
    <div className="App" id='App'>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
