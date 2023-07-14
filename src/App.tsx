import React from 'react';
import MainPage from "./components/MainPage";
import './css/app.css'
import {
    BrowserRouter,
    Route,
    Routes,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements, Params
} from "react-router-dom";
import TrainingPage from "./components/TrainingPage";
import {fetchGetAllExercisesByTrainingId} from "./api/Exercises";
import {fetchGetAllTrainings} from "./api/Trainings";
import {PageTransition} from "@steveeeie/react-page-transition";
import {LoaderFunction} from "react-router";
import mainPage from "./components/MainPage";


const router = createBrowserRouter([
    {
        element: <MainPage/>,
        path: "/",
        loader:  async () => {
            return fetchGetAllTrainings()
        }
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
