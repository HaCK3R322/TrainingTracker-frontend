import {motion} from "framer-motion";
import {ExerciseCardsSwiper} from "./ExerciseCardSwiper";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'
import '../../style/trainingpage/exercisecard.css'
import '../../style/trainingpage/exercisecardsswiperpagination.css'
import TrainingPageHeader from "./TrainingPageHeader";
import React, {useEffect, useState} from "react";
import {createTheme} from "@mui/material";
import {useParams} from "react-router";
import BackendUrls from '../../api/BackendUrls.json';
import dayjs from "dayjs";
import fetchPost from "../../api/fetchPost";
import 'dayjs/locale/en-gb';
import fetchDeleteExerciseById from "../../api/fetchDeleteExerciseById";
import fetchPatchSet from "../../api/fetchPatchSet";
import fetchDeleteSetById from "../../api/fetchDeleteSetById";
import fetchGetAllExercisesWithSetsByTrainingId from "../../api/fetchGetAllExercisesWithSetsByTrainingId";
import transformFetchedDataToExercises from "../../util/exercises/transformFetchedDataToExercises";
import createNewExercise from "../../util/exercises/createNewExercise";
import fetchExercisePut from "../../api/fetchExercisePut";
import Stats from "./Stats";
import Calendar from "./Calendar";

const TrainingPage = () => {
    const {trainingId} = useParams()
    const [exercises, setExercises] = useState([]);
    const [dateCalendarValue, setDateCalendarValue] = useState(dayjs(new Date()))
    const [cardsCreatedOnPickedDate, setCardsCreatedOnPickedDate] = useState([]);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isStatsVisible, setStatsVisible] = useState(false)

    // fetching from server all exercises from server
    useEffect(() => {
        getCachedExercisesOfTraining(trainingId)
        fetchGetAllExercisesWithSetsByTrainingId(trainingId)
            .then(data => {
                setExercises(transformFetchedDataToExercises(data))
            })
    }, [trainingId])

    // Cache exercises on every change
    useEffect(() => {
        console.log("EFFECT: exercises state was updated! new state: ", exercises)
        cacheExercises(trainingId, exercises)
    }, [exercises]);

    // Re-set cards if changed exercises OR picked day
    useEffect(() => {
        const cards = getCardsCreatedOnPickedDate()
        console.log("Updated cards:", cards)
        setCardsCreatedOnPickedDate(cards)
    }, [trainingId, dateCalendarValue, exercises]);

    const createNewExerciseForPickedDayCallback = (name, units) => {
        let pickedDayTimestamp = dayjs(dateCalendarValue)

        // timestamp adjusting
        pickedDayTimestamp = pickedDayTimestamp.set('hour', new Date().getHours())
        pickedDayTimestamp = pickedDayTimestamp.set('minute', new Date().getMinutes())
        pickedDayTimestamp = pickedDayTimestamp.set('second', new Date().getSeconds())
        pickedDayTimestamp = pickedDayTimestamp.set('millisecond', new Date().getMilliseconds())

        createNewExercise(trainingId, name, units, pickedDayTimestamp)
            .then(createdExercise => {
                console.log("Created exercise fetched from server:", createdExercise)
                setExercises([...exercises, createdExercise])
            })
    }

    const deleteExerciseByIdCallback = (exerciseId) => {
        fetchDeleteExerciseById(exerciseId)
        let newExercises = exercises.filter(e => e.id !== exerciseId)
        console.log("Deleting exercise by id:\nwas: ", exercises, "\nnow: ", newExercises)
        cacheExercises(trainingId, newExercises)
        setExercises(newExercises)
    }

    function swapTwoCardsTimestampsByIdCallback(id1, id2) {
        let timestamp1 = exercises.find(e => e.id === id1).timestamp
        let timestamp2 = exercises.find(e => e.id === id2).timestamp

        let exercise1Index = exercises.findIndex(e => e.id === id1)
        let exercise2Index = exercises.findIndex(e => e.id === id2)

        const newExercises = [...exercises]
        newExercises[exercise1Index].timestamp = timestamp2
        newExercises[exercise2Index].timestamp = timestamp1

        fetchExercisePut(newExercises[exercise1Index])
            .then(response => response.json())
            .then(updatedExercise =>
                console.log("Updated exercise! New fields:", updatedExercise)
            )
        fetchExercisePut(newExercises[exercise2Index])
            .then(response => response.json())
            .then(updatedExercise =>
                console.log("Updated exercise! New fields:", updatedExercise)
            )

        setExercises(newExercises)
    }

    function getCardsCreatedOnPickedDate() {
        return exercises.filter(exercise =>
            exercise.timestamp.isSame(dateCalendarValue, 'day')
        )
    }

    function createNewSetForExerciseWithId(exerciseId)  {
        let newSet = {
            exerciseId: exerciseId,
            amount: null,
            reps: null
        }

        return fetchPost(BackendUrls.urls.sets, newSet)
            .then(response => response.json())
            .then(createdSet => {
                let newExercises = [...exercises]
                newExercises.find(exercise => exercise.id === exerciseId)
                    .sets.push(createdSet)
                setExercises(newExercises);
            })
    }

    const patchSetCallback = (newSet) => {
        fetchPatchSet(newSet);

        let exerciseIndex = exercises.findIndex(ex => ex.id === newSet.exerciseId);

        let setIndex = (exercises[exerciseIndex]).sets.findIndex(set => set.id === newSet.id)

        let newExercises = [...exercises]
        newExercises[exerciseIndex].sets[setIndex] = newSet;
        setExercises(newExercises)
    }

    const deleteSetByIdCallback = (setId) => {
        fetchDeleteSetById(setId)
    }

    //TODO: uncomment
    const onRestoreClickCallback = () => {
        setStatsVisible(!isStatsVisible)

        // const previousExercises = exercises.filter(exercise => {
        //     return exercise.timestamp.isBefore(dateCalendarValue, 'day')
        // })
        // const sortedExercises = previousExercises.sort((a, b) => a.timestamp.diff(b.timestamp));
        // const firstExerciseTimestamp = sortedExercises.length > 0 ? sortedExercises[sortedExercises.length - 1].timestamp : null;
        // const exercisesFromFirstDay = sortedExercises.filter(exercise =>
        //     exercise.timestamp.isSame(firstExerciseTimestamp, 'day')
        // );
        //
        // // create new ones
        // exercisesFromFirstDay
        //     .forEach((exercise, index) => {
        //         createNewExercise(
        //             trainingId,
        //             exercise.name,
        //             exercise.units,
        //             dayjs(dateCalendarValue).add(index, 'seconds')
        //         ).then(createdExercise =>
        //             setExercises((oldExercises) => [...oldExercises, createdExercise])
        //         )
        //     })
    }


    return (
        <motion.div
            initial={{x: "100%"}}
            animate={{x: "0%"}}
            exit={{x: "100%"}}
            transition={{duration: 0.3}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height:  "100%"
            }}
        >
            <div className={"motion-framer-wrapper"}   key="TrainingPage-Wrapper">
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>
                        <Calendar
                            exercises={exercises}
                            dateCalendarValue={dateCalendarValue}
                            setDateCalendarValue={setDateCalendarValue}
                            isVisible={isCalendarVisible}
                            setVisible={setCalendarVisible}
                        />

                        <motion.div
                            animate={isCalendarVisible
                                ? {top: "300px"} :
                                {top: "0px"}
                            }

                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <TrainingPageHeader
                                dateCalendarValue={dateCalendarValue}
                                onClickCallback={() => {setCalendarVisible(!isCalendarVisible)}}
                                onRestoreClickCallback={onRestoreClickCallback}
                            />

                            <div className={"scroller-div"}>
                                <ExerciseCardsSwiper
                                    cards={cardsCreatedOnPickedDate}
                                    setCards={setCardsCreatedOnPickedDate}
                                    chosenDate={dateCalendarValue}

                                    swapTwoCardsTimestamps={swapTwoCardsTimestampsByIdCallback}
                                    createNewExerciseFromNameAndUnitsCallback={createNewExerciseForPickedDayCallback}
                                    deleteExerciseByIdCallback={deleteExerciseByIdCallback}
                                    createNewSetForExerciseWithId={createNewSetForExerciseWithId}
                                    patchSetCallback={patchSetCallback}
                                    deleteSetByIdCallback={deleteSetByIdCallback}
                                />
                            </div>

                            <Stats
                                isVisible={isStatsVisible}
                                setVisible={setStatsVisible}
                            />

                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

function cacheExercises(trainingId, exercises) {
    window.localStorage.setItem("training-" + trainingId + "-cached-exercises", JSON.stringify(exercises));
    console.log("Exercises of training " + trainingId + " was cached\n", exercises)
}
function getCachedExercisesOfTraining(trainingId) {
    let exercises = JSON.parse(window.localStorage.getItem("training-" + trainingId + "-cached-exercises"));
    if (exercises === null) exercises = []

    exercises.forEach(exercise => exercise.timestamp = dayjs(exercise.timestamp))

    console.log("Exercises restored from cache:", exercises)

    return exercises
}

export default TrainingPage;