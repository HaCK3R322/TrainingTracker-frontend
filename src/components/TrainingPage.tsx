import React, {CSSProperties} from 'react';
import Header from "./Header";

import './../css/app.css'
import styled from "styled-components";
import Exercise from "../api/entities/Exercise";
import {useLoaderData, useNavigate, useNavigation, useParams} from "react-router-dom";

import {motion} from "framer-motion";
import {fetchGetAllExercisesByTrainingId} from "../api/Exercises";
import training from "../api/entities/Training";
import ExerciseCard from "./ExerciseCard";




const TrainingPage = () => {
    const navigate = useNavigate();

    let {trainingId} = useParams();

    return (
        <motion.div
            initial={{x: window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
            transition={{ duration: 0.5}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: window.innerWidth + 'px',
                height: window.innerHeight + 'px'
            }}
                 key="TrainingPage-Wrapper"
            >
                <Header key={'TrainingPage-header'}/>

                <button key={'backToMainPageButton'} style={backToMainPageButton} onClick={() => navigate("/")}>
                    ←
                </button>

                <ExerciseCard name={'Platform press'} units={'kg'} sets={Sets}/>

                <button key={'toStatsButton'} style={toStatsButton} onClick={() => {alert('soon...')}}>
                    ↓
                </button>
            </div>
        </motion.div>
    );
};

const Sets = [
    {id: 1, reps: 10, amount: 70},
    {id: 2, reps: 12, amount: 70},
    {id: 3, reps: 11, amount: 70},
    {id: 1, reps: 11, amount: 70}
]

const someDivStyle: CSSProperties = {
    fontSize: '20px',
    position: 'absolute',
    top: '200px',
    backgroundColor: 'gray',

    left: '50%',
    transform: 'translate(-50%, 0)'
}

const backToMainPageButton: CSSProperties = {
    position: 'absolute',
    fontSize: '40px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    bottom: '15px',

    backgroundColor: '#D9D9D9',

    top: '0px',
    left: '0px',
    margin: '0',
    padding: '0',
}

const toStatsButton: CSSProperties = {
    position: 'absolute',
    fontSize: '40px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: '15px',

    backgroundColor: '#D9D9D9'
}

export default TrainingPage;