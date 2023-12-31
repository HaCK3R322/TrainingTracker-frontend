import React, {CSSProperties, useEffect, useState} from 'react';
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
import exerciseCard from "./ExerciseCard";


type ExerciseCardProps = {
    exercise: Exercise,
    sets: Set[]
}

const TrainingPage = () => {
    const navigate = useNavigate();

    // костыль чтоб зафискить непонятный ресайз окна на каждый ререндер
    let [innerWidth, setInnerWidth] = useState(window.innerWidth)
    let [innerHeight, setInnerHeight] = useState(window.innerHeight)

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
                    let sets: Set[] = data as Set[];
                    let exerciseCardProps: ExerciseCardProps = {
                        exercise: exercise,
                        sets: sets
                    }

                    console.log('For exercise \'' + exercise.name + '\' loaded sets:')
                    console.log(sets)

                    setExerciseCards(prevState => [...prevState, exerciseCardProps])
                    setLoadedExercisesNumber(prevState => prevState + 1);
                })
        })
    }, [exercises])

    useEffect(() => {
        if (loadedExercisesNumber === exercises.length && loadedExercisesNumber !== 0) {
            console.log('all loaded')

            exerciseCards.forEach(card => {
                card.sets.sort((a,b) => {
                    if (a.id > b.id) {
                        return 1;
                    } else if(a.id < b.id) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            })

            setAllLoaded(true);
        } else {
            if (loadedExercisesNumber !== 0) {
                console.log('loading exercises sets: ' + loadedExercisesNumber + ' / ' + exercises.length);
            }
        }
    }, [loadedExercisesNumber])

    const getLegExtentionCardIndex = () => {
        for(let i = 0; i < exerciseCards.length; i++ ) {
            if(exerciseCards[i].exercise.name === 'Leg extention') {
                return i;
            }
        }

        return 0;
    }

    console.log("before render function: " + window.innerWidth)

    return (
        <motion.div
            initial={{x: window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
            transition={{ duration: 0.3}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: innerWidth + 'px',
                height: innerHeight + 'px',
            }}
                 key="TrainingPage-Wrapper"
                 id={"TrainingPage-Wrapper"}
            >
                <Header key={'TrainingPage-header'}/>

                <button key={'add-button'} style={backToMainPageButton} onClick={() => navigate("/")}>
                    <img
                        src={require("./../images/arrow.png")}
                        style={{
                            width: '34px',
                            height: '32px',
                            transform: 'scaleX(-1)', // This will reverse the image horizontally
                        }}
                    />
                </button>

                {!allLoaded
                    ?
                        <div>loading...</div>
                    :
                    <ExerciseCard
                        name={exerciseCards[getLegExtentionCardIndex()].exercise.name}
                        units={exerciseCards[getLegExtentionCardIndex()].exercise.units}
                        sets={exerciseCards[getLegExtentionCardIndex()].sets}
                    />
                }

                <button key={'add-button'} style={toStatsButton} onClick={() => alert("soon...")}>
                    <img
                        src={require("./../images/arrow.png")}
                        style={{
                            width: '34px',
                            height: '32px',
                            transform: 'rotate(90deg)', // This will reverse the image horizontally
                        }}
                    />
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