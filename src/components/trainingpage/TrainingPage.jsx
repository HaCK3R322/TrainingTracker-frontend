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
import {createTheme, ThemeProvider, useTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useParams} from "react-router";
import fetchGet from "../../api/fetchGet";
import BackendUrls from '../../api/BackendUrls.json';
import dayjs from "dayjs";
import fetchPost from "../../api/fetchPost";
import 'dayjs/locale/en-gb';
import fetchDeleteExerciseById from "../../api/fetchDeleteExerciseById";
import {create} from "@mui/material/styles/createTransitions";
import fetchPatchSet from "../../api/fetchPatchSet";
import fetchDeleteSetById from "../../api/fetchDeleteSetById";

const TrainingPage = () => {
    const {trainingId} = useParams()
    const [exercises, setExercises] = useState([]);
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
            })
    }, []);

    useEffect(() => {
        setCardsCreatedOnPickedDate(getCardsCreatedOnPickedDate())
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

        fetchPost(BackendUrls.urls.exercises, newExerciseBody)
            .then(response => response.json())
            .then(createdExercise => {
                let newExercises = [...exercises];
                createdExercise.sets = []
                newExercises.push(createdExercise);
                setExercises(newExercises);
            })
    }

    const deleteExerciseByIdCallback = (exerciseId) => {
        console.log("deleting exercise with id " + exerciseId)

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

        fetchPost(BackendUrls.urls.sets, newSet)
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
                                {top: "-334px"}
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
                                height: "334px"
                            }}>
                                <ThemeProvider theme={calendarTheme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                                        <DateCalendar
                                            sx={{
                                                color: "var(--second-color)",
                                                '& button': {color: 'var(--second-color)'},
                                                '& span': {color: 'var(--second-color)'}
                                            }}
                                            value={dateCalendarValue}
                                            onChange={(newDateCalendarValue) => {
                                                setDateCalendarValue(newDateCalendarValue)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={isCalendarVisible
                                ? {top: "334px"} :
                                {top: "0px"}
                            }

                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <TrainingPageHeader dateCalendarValue={dateCalendarValue} onClickCallback={() => {setIsCalendarVisible(!isCalendarVisible)}}/>

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

export default TrainingPage;