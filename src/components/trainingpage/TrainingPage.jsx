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
import React, {useEffect, useState} from "react";
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

const TrainingPage = () => {
    const {trainingId} = useParams()
    const [exercises, setExercises] = useState(getCachedExercisesOfTraining(trainingId));
    const [dateCalendarValue, setDateCalendarValue] = useState(dayjs(new Date()))
    const [cardsCreatedOnPickedDate, setCardsCreatedOnPickedDate] = useState([]);

    useEffect(() => {
        fetchGet(BackendUrls.urls.exercises + "?trainingId=" + trainingId) // get all exercises for training
            .then(response => response.json())
            .then(async exercisesData => {
                for (const exercise of exercisesData) {
                    exercise.sets = await fetchGet(BackendUrls.urls.sets + "?exerciseId=" + exercise.id)
                        .then(response => response.json())
                }
                setExercises(exercisesData)
                cacheExercises(trainingId, exercisesData)
            })
    }, []);

    useEffect(() => {
        setCardsCreatedOnPickedDate(getCardsCreatedOnPickedDate())
        cacheExercises(trainingId, exercises)
    }, [dateCalendarValue, exercises]);

    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const calendarTheme = createTheme({
        typography: {
            fontFamily: `'Questrial', sans-serif`,
            color: "var(--second-color)"
        }
    })

    const createNewExerciseFromNameAndUnitsCallback = (name, units) => {
        let pickedDateTimestamp = dayjs(dateCalendarValue).unix() * 1000;

        let newExerciseBody = {
            name: name,
            units: units,
            trainingId: trainingId,
            timestamp: pickedDateTimestamp
        }

        return fetchPost(BackendUrls.urls.exercises, newExerciseBody)
            .then(response => response.json())
            .then(createdExercise => {
                createdExercise.sets = []
                setExercises(prevState => {
                    return [...prevState, createdExercise]
                })
            })
    }

    const deleteExerciseByIdCallback = (exerciseId) => {
        fetchDeleteExerciseById(exerciseId);
    }

    function getCardsCreatedOnPickedDate() {
        return exercises.filter(exercise => {
            let exerciseDate = new Date(Date.parse(exercise.timestamp))
            let currentChosenDate = dayjs(dateCalendarValue).format('DD-MM-YYYY')
            return currentChosenDate === dayjs(exerciseDate).format('DD-MM-YYYY')
        })
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
                setExercises(newExercises)
            })
    }

    const patchSetCallback = (newSet) => {
        fetchPatchSet(newSet)
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
        // put all days on Set, except for that today
        let daysSet = new Set()
        exercises.forEach(exercise => {
            let exerciseDay = dayjs(exercise.timestamp)
            if(!dayjs(Date.now()).isSame(exerciseDay, 'day'))
                daysSet.add(exerciseDay);
        })

        if(daysSet.size === 0) return; // this is first day of training ever

        // get as array
        let daysArray = Array.from(daysSet);
        // sort array
        daysArray.sort();
        // DAY = array[len - 1]
        let prevTrainingDay = daysArray[daysArray.length - 1]
        // get all that same day as DAY
        let prevTrainingExercises = exercises.filter(exercise => {
            return dayjs(exercise.timestamp).isSame(prevTrainingDay, 'day')
        })
        // create new ones
        prevTrainingExercises.forEach(exercise => {
            createNewExerciseFromNameAndUnitsCallback(exercise.name, exercise.units)
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
                                    createNewExerciseFromNameAndUnitsCallback={createNewExerciseFromNameAndUnitsCallback}
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
}
function getCachedExercisesOfTraining(trainingId) {
    let exercises = JSON.parse(window.localStorage.getItem("training-" + trainingId + "-cached-exercises"));
    return exercises === null ? [] : exercises
}

export default TrainingPage;