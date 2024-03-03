import {motion} from "framer-motion";
import {ExerciseCardsSwiper} from "./ExerciseCardSwiper";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'
import '../../style/trainingpage/exercisecard.css'
import '../../style/trainingpage/exercisecardsswiperpagination.css'
import TrainingPageHeader from "./TrainingPageHeader";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import BackendUrls from '../../api/BackendUrls.json';
import dayjs from "dayjs";
import fetchPost from "../../api/fetchPost";
import 'dayjs/locale/en-gb';
import fetchDeleteExerciseById from "../../api/fetchDeleteExerciseById";
import fetchPatchSet from "../../api/fetchPatchSet";
import fetchDeleteSet from "../../api/fetchDeleteSet";
import fetchGetAllExercisesWithSetsByTrainingId from "../../api/fetchGetAllExercisesWithSetsByTrainingId";
import transformFetchedDataToExercises from "../../util/exercises/transformFetchedDataToExercises";
import fetchCreateNewExercise from "../../util/exercises/fetchCreateNewExercise";
import fetchExercisePut from "../../api/fetchExercisePut";
import Stats from "./Stats";
import Calendar from "./Calendar";
import FramerMotionWrapperDiv from "../FramerMotionWrapperDiv";
import {ExercisesContext} from "./contexts/ExercisesContext";
import {CalendarContext} from "./contexts/CalendarContext";

const TrainingPage = () => {
    const {trainingId} = useParams()
    const [exercises, setExercises] = useState([]);
    const [dateCalendarValue, setDateCalendarValue] = useState(dayjs(new Date()))
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

    const createExercise = (exercise) => {
        fetchCreateNewExercise(exercise)
            .then(createdExercise => {
                console.log("Created exercise fetched from server:", createdExercise)
                setExercises([...exercises, createdExercise])
            })
    }

    const deleteExercise = (exercise) => {
        fetchDeleteExerciseById(exercise.id)
        let newExercises = exercises.filter(e => e.id !== exercise.id)
        console.log("Deleting exercise by id:\nwas: ", exercises, "\nnow: ", newExercises)
        cacheExercises(trainingId, newExercises)
        setExercises(newExercises)
    }

    function swapTimestamps(exercise1, exercise2) {
        const newExercises = [...exercises]

        const index1 = newExercises.findIndex(e => e.id === exercise1.id)
        const index2 = newExercises.findIndex(e => e.id === exercise2.id)

        newExercises[index1].timestamp = exercise2.timestamp
        newExercises[index2].timestamp = exercise1.timestamp

        fetchExercisePut(newExercises[index1])
            .then(response => response.json())
            .then(updatedExercise =>
                console.log("Updated exercise! New fields:", updatedExercise)
            )
        fetchExercisePut(newExercises[index2])
            .then(response => response.json())
            .then(updatedExercise =>
                console.log("Updated exercise! New fields:", updatedExercise)
            )

        setExercises(newExercises)
    }

    function createSet(exercise)  {
        let newSet = {
            exerciseId: exercise.id,
            amount: null,
            reps: null
        }

        return fetchPost(BackendUrls.urls.sets, newSet)
            .then(response => response.json())
            .then(createdSet => {
                let newExercises = [...exercises]
                newExercises.find(e => e.id === exercise.id)
                    .sets.push(createdSet)
                setExercises(newExercises);
            })
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

    const exercisesContextValue = {
        trainingId: trainingId,
        exercises: exercises,
        setExercises: setExercises,
        swapTimestamps: swapTimestamps,
        createExercise: createExercise,
        deleteExercise: deleteExercise,
        createSet: createSet,
        deleteSet: fetchDeleteSet,
        patchSet: fetchPatchSet
    }
    const calendarContextValue = {
        dateValue: dateCalendarValue,
        setDateValue: setDateCalendarValue,
        isVisible: isCalendarVisible,
        setVisible: setCalendarVisible
    }


    return (
        <FramerMotionWrapperDiv keyName={"TRAINING-PAGE-KEY"}>
            <ExercisesContext.Provider value={exercisesContextValue}>
                <CalendarContext.Provider value={calendarContextValue}>
                    <div className={"training-tracker-theme"}>
                        <div className={"background-div"}>
                            <Calendar/>

                            <motion.div
                                animate={isCalendarVisible ? {top: "300px"} : {top: "0px"}}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <TrainingPageHeader restore={onRestoreClickCallback}/>

                                <div className={"scroller-div"}>
                                    <ExerciseCardsSwiper/>
                                </div>

                                <Stats
                                    isVisible={isStatsVisible}
                                    setVisible={setStatsVisible}
                                    exercises={exercises}
                                />
                            </motion.div>
                        </div>
                    </div>
                </CalendarContext.Provider>
            </ExercisesContext.Provider>
        </FramerMotionWrapperDiv>
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