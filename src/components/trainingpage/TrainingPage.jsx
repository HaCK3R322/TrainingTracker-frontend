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
import React, {useState} from "react";
import {createTheme, ThemeProvider, useTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";


const cardsDataInitial = [
    {name: "squats",
        units: "kg",
        sets: [{amount: 80, reps: 12}, {amount: 80, reps: 10}, {amount: 80, reps: 6}],
        id: 1
    },
    {name: "leg extention (two legs)",
        units: "kg",
        sets: [{amount: 110, reps: 12}, {amount: 110, reps: 12}, {amount: 110, reps: 11}],
        id: 2
    },
    {name: "leg curls",
        units: "kg",
        sets: [{amount: 94, reps: 12}, {amount: 250, reps: 10}, {amount: 250, reps: 8}],
        id: 3
    },
    {name: "shoulders",
        units: "kg",
        sets: [{amount: 12, reps: 12}, {amount: 12, reps: 12}, {amount: 12, reps: 12}],
        id: 4
    },
    {name: "rotator",
        units: "kg",
        sets: [{amount: 8, reps: 10}, {amount: 8, reps: 10}, {amount: 8, reps: 10}],
        id: 5
    },
    {name: "предплечье блок",
        units: "kg",
        sets: [{amount: 60, reps: 12}, {amount: 60, reps: 12}, {amount: 60, reps: 12}],
        id: 6
    },
    {name: "shoulders",
        units: "kg",
        sets: [{amount: 12, reps: 12}, {amount: 12, reps: 12}, {amount: 12, reps: 12}],
        id: 7
    },
    {name: "rotator",
        units: "kg",
        sets: [{amount: 8, reps: 10}, {amount: 8, reps: 10}, {amount: 8, reps: 10}],
        id: 8
    }
]

const TrainingPage = () => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const calendarTheme = createTheme({
        typography: {
            fontFamily: `'Questrial', sans-serif`,
            fontSize: "100px",
            color: "white"
        }
    })

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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar sx={{color: "white"}} />
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
                            <TrainingPageHeader />

                            <div className={"scroller-div"}>
                                <ExerciseCardsSwiper cardsData={cardsDataInitial}/>
                            </div>
                        </motion.div>


                        <button onClick={() => {setIsCalendarVisible(!isCalendarVisible)}}
                                style={{
                                    width: "100px",
                                    height: "50px",
                                    backgroundColor: "red",
                                    top: "500px",
                                    position: "absolute",
                                    zIndex: 5
                                }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;