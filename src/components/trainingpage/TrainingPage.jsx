import {motion} from "framer-motion";
import {ExerciseCardsSwiper} from "./ExerciseCardSwiper";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'
import '../../style/trainingpage/exercisecard.css'
import '../../style/trainingpage/exercisecardsswiperpagination.css'
import TrainingPageHeader from "./TrainingPageHeader";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React, {useEffect, useRef, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {useParams} from "react-router";
import fetchGet from "../../api/fetchGet";
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

const TrainingPage = () => {
    const {trainingId} = useParams()
    const [exercises, setExercises] = useState([]);
    const [dateCalendarValue, setDateCalendarValue] = useState(dayjs(new Date()))
    const [cardsCreatedOnPickedDate, setCardsCreatedOnPickedDate] = useState([]);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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

    const calendarTheme = createTheme({
        typography: {
            fontFamily: `'Questrial', sans-serif`,
            color: "var(--second-color)"
        }
    })

    const createNewExerciseForPickedDayCallback = (name, units) => {
        let pickedDayTimestamp = dayjs(dateCalendarValue)
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

    function getCardsCreatedOnPickedDate() {
        return exercises.filter(exercise =>
            exercise.timestamp.isSame(dateCalendarValue, 'day')
        )
    }

    const createNewSetForExerciseWithId = (exerciseId) => {
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

    const wasMentioned = (day) => {
        for (const exercise of exercises) {
            const exerciseTimestamp = exercise.timestamp;

            // Assuming exerciseTimestamp is a number representing the timestamp
            const exerciseDay = dayjs(exerciseTimestamp);

            // Compare day with exercise timestamp using dayjs methods
            if (day.isSame(exerciseDay, 'day')) {
                return true;
            }
        }

        return false;
    };

    const onRestoreClickCallback = () => {
        const previousExercises = exercises.filter(exercise => {
            return exercise.timestamp.isBefore(dateCalendarValue, 'day')
        })
        const sortedExercises = previousExercises.sort((a, b) => a.timestamp.diff(b.timestamp));
        const firstExerciseTimestamp = sortedExercises.length > 0 ? sortedExercises[sortedExercises.length - 1].timestamp : null;
        const exercisesFromFirstDay = sortedExercises.filter(exercise =>
            exercise.timestamp.isSame(firstExerciseTimestamp, 'day')
        );

        // create new ones
        exercisesFromFirstDay
            .forEach((exercise, index) => {
                createNewExercise(
                    trainingId,
                    exercise.name,
                    exercise.units,
                    dayjs(dateCalendarValue).add(index, 'seconds')
                ).then(createdExercise =>
                    setExercises((oldExercises) => [...oldExercises, createdExercise])
                )
            })
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

                        <motion.div
                            animate={isCalendarVisible
                                ? {top: "0"} :
                                {top: "-300px"}
                            }

                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <div style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                backgroundColor: "black",
                                width: "100%",
                                height: "300px"
                            }}>
                                <ThemeProvider theme={calendarTheme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                                        <DateCalendar
                                            sx={{
                                                color: "var(--second-color)",
                                                '& button': { color: 'var(--second-color)' },
                                                '& span': { color: 'var(--second-color)' },
                                            }}
                                            value={dateCalendarValue}
                                            onChange={(newDateCalendarValue) => {
                                                setDateCalendarValue(newDateCalendarValue);
                                            }}
                                            slotProps={{
                                                day: (date, dateRangeProps) => {
                                                    const isGreen = wasMentioned(date.day);
                                                    const dayProps = dateRangeProps?.getDayProps({ date, ...dateRangeProps }) || {};

                                                    return {
                                                        ...dayProps,
                                                        style: {
                                                            ...(dayProps.style || {}),
                                                            color: isGreen ? 'var(--button-color)' : undefined,
                                                        },
                                                        sx: {
                                                            "&.MuiPickersDay-root.Mui-selected": {
                                                                outline: "1px solid var(--blue-color)",
                                                                backgroundColor: "black"
                                                            },
                                                        }
                                                    };
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>
                        </motion.div>

                        {isCalendarVisible &&
                            <motion.div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: "300px",
                                    left: 0,
                                    zIndex: 100
                                }}
                                onTap={() => {setIsCalendarVisible(false)}}
                            />
                        }

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
                                onClickCallback={() => {setIsCalendarVisible(!isCalendarVisible)}}
                                onRestoreClickCallback={onRestoreClickCallback}
                            />

                            <div className={"scroller-div"}>
                                <ExerciseCardsSwiper
                                    cards={cardsCreatedOnPickedDate}
                                    setCards={setExercises}
                                    createNewExerciseFromNameAndUnitsCallback={createNewExerciseForPickedDayCallback}
                                    deleteExerciseByIdCallback={deleteExerciseByIdCallback}
                                    chosenDate={dateCalendarValue}
                                    createNewSetForExerciseWithId={createNewSetForExerciseWithId}
                                    patchSetCallback={patchSetCallback}
                                    deleteSetByIdCallback={deleteSetByIdCallback}
                                />
                            </div>
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