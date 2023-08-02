import React, {CSSProperties, useEffect} from 'react';
import Header from "./Header";

import './../css/app.css'
import styled from "styled-components";
import Exercise from "../api/entities/Exercise";
import {useLoaderData, useNavigate, useNavigation, useParams} from "react-router-dom";

import {motion} from "framer-motion";
import {fetchGetAllExercisesByTrainingId} from "../api/Exercises";
import ExerciseCard from "./ExerciseCard";
import Set from "../api/entities/Set";
import {fetchGetAllSetsByExerciseId} from "../api/Sets";


type ExerciseCardProps = {
    exercise: Exercise,
    sets: Set[]
}

const TrainingPage = () => {
    const navigate = useNavigate();

    let {trainingId} = useParams();
    let [exercises, setExercises] = React.useState<Exercise[]>([]);
    let [exerciseCards, setExerciseCards] = React.useState<ExerciseCardProps[]>([]);

    let [loadedExercisesNumber, setLoadedExercisesNumber] = React.useState<number>(0);
    let [allLoaded, setAllLoaded] = React.useState<boolean>(false);

    useEffect(() => {
        if (trainingId === undefined) {
            return;
        }

        fetchGetAllExercisesByTrainingId(parseInt(trainingId))
            .then(data => {
                setExercises(data as Exercise[]);
                console.log("loaded exercises: ")
                console.log(data)
            })
    }, [])

    useEffect(() => {

        exercises.forEach(exercise => {
            fetchGetAllSetsByExerciseId(exercise.id)
                .then(data => {
                    console.log(data)
                    let sets: Set[] = data as Set[];
                    let exerciseCardProps: ExerciseCardProps = {
                        exercise: exercise,
                        sets: sets
                    }
                    setExerciseCards(prevState => [...prevState, exerciseCardProps])
                    setLoadedExercisesNumber(prevState => prevState + 1);
                })
        })
    }, [exercises])

    useEffect(() => {
        console.log(loadedExercisesNumber)
        if (loadedExercisesNumber === exercises.length && loadedExercisesNumber !== 0) {
            console.log('all loaded')
            setAllLoaded(true);
        } else {
            console.log('not all loaded: ' + loadedExercisesNumber + ' / ' + exercises.length)
        }
    }, [loadedExercisesNumber])

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

                {!allLoaded ? <div>loading...</div> :
                    <ExerciseCard
                        name={exerciseCards[0].exercise.name}
                        units={exerciseCards[0].exercise.units}
                        sets={exerciseCards[0].sets}
                    />
                }

                <button key={'toStatsButton'} style={toStatsButton} onClick={() => {alert('soon...')}}>
                    ↓
                </button>
            </div>
        </motion.div>
    );
};

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