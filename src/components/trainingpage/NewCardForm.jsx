import React, {useContext, useEffect, useState} from 'react';
import '../../style/trainingpage/newcardform.css'
import SwipeStates from "./SwipeStates.json";
import {motion} from "framer-motion";
import okaymark from '../../images/okaymark.png'
import fetchPost from "../../api/fetchPost";
import BackendUrls from '../../api/BackendUrls.json';
import dayjs from "dayjs";
import {ExercisesContext} from "./contexts/ExercisesContext";
import Calendar from "./Calendar";
import {CalendarContext} from "./contexts/CalendarContext";


const NewCardForm = ({
                         swipedRightCallback,
                         swipedLeftCallback,
                         swipeState,

                         cards
                     }) => {
    const exercisesContext = useContext(ExercisesContext)
    const dateValue = useContext(CalendarContext).dateValue

    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(0);
    const [animateState, setAnimateState] = useState({zIndex: 3});
    const [cardLimitNotExceed, setCardLimitNotExceed] = useState(cards.length < 10 ? true : false);

    useEffect(() => {
        if(cards.length < 10) {
            setCardLimitNotExceed(true);
        } else {
            setCardLimitNotExceed(false);
        }
    }, [cards]);


    const [name, setName] = useState("");
    const [nameAcceptable, setNameAcceptable] = useState(false);
    useEffect(() => {
        if(name !== "") {
            setNameAcceptable(true);
        } else {
            setNameAcceptable(false);
        }
    }, [name]);

    const [units, setUnits] = useState("kg");

    const [canSubmit, setCanSubmit] = useState(false);
    useEffect(() => {
        setCanSubmit(nameAcceptable && cardLimitNotExceed);
    }, [nameAcceptable, cardLimitNotExceed]);

    useEffect(() => {
        setAnimateState(getAnimationBasedOnSwipeState(swipeState));
    }, [swipeState]);

    function createNewExerciseCallback() {
        if(canSubmit) {
            let pickedDayTimestamp = dayjs(dateValue)

            // timestamp adjusting
            pickedDayTimestamp = pickedDayTimestamp.set('hour', new Date().getHours())
            pickedDayTimestamp = pickedDayTimestamp.set('minute', new Date().getMinutes())
            pickedDayTimestamp = pickedDayTimestamp.set('second', new Date().getSeconds())
            pickedDayTimestamp = pickedDayTimestamp.set('millisecond', new Date().getMilliseconds())

            exercisesContext.createNewExercise({
                trainingId: exercisesContext.trainingId,
                name: name,
                units: units,
                timestamp: pickedDayTimestamp
            })

            setName("")
            setUnits("kg")
        }
    }

    const handleDragStart = (info) => {
        setDragStartPoint(info.point.x);
    }

    const handleOnDrag = (info) => {
        let dragEnd = info.point.x;
        let distance = dragEnd - dragStartPoint;

        if(distance > 100) { // --->
            setSwipedRight(true);
            setSwipedLeft(false);
        } else if (distance < -100) { // <---
            setSwipedLeft(true);
            setSwipedRight(false);
        } else { // <->
            setSwipedRight(false);
            setSwipedLeft(false);
        }
    }
    const handleDragEnd = (info) => {
        if(swipedLeft) {
            swipedLeftCallback();
        }
        if(swipedRight) {
            swipedRightCallback();
        }

        setSwipedRight(false);
        setSwipedLeft(false);
    }

    return (
        <motion.div className={"new-card-form"}
                    drag={"x"}
                    dragSnapToOrigin={true}

                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}

                    transition={{duration: 0.1}}
                    animate={animateState}
        >
            <div className={"name"}>
                <motion.input
                    placeholder={"name"}
                    value={name}
                    onChange={(event) => setName(event.target.value.toLowerCase())}
                    onTap={(event) => {
                        if(event !== null && event !== undefined && event.isTrusted === true) {
                            event.target.focus()
                        }
                    }}
                />
            </div>

            <div className={"units-choice-div"} >
                <motion.div className={`kg option ${units === "kg" ? "chosen-unit" : ""}`}
                    onTap={() => {setUnits("kg")}}
                >
                    <p>kg</p>
                </motion.div>

                <motion.div className={`sec option ${units === "sec" ? "chosen-unit" : ""}`}
                            onTap={() => {setUnits("sec")}}
                >
                    <p>sec</p>
                </motion.div>

                <motion.div className={`min option ${units === "min" ? "chosen-unit" : ""}`}
                            onTap={() => {setUnits("min")}}
                >
                    <p>min</p>
                </motion.div>
            </div>

            <div
                className={"create-button"}
            >
                <motion.button
                    style={{
                        opacity: canSubmit ? 1.0 : 0.5,
                    }}

                    whileTap={{
                        scale: canSubmit ? 0.9 : 1.0
                    }}

                    onClick={() => {createNewExerciseCallback()}}
                >
                    <img src={okaymark} />
                </motion.button>
            </div>
        </motion.div>
    );
};

function getAnimationBasedOnSwipeState(swipeState) {
    switch(swipeState) {
        case SwipeStates.CENTRAL:
            return {
                zIndex: 3,
                x: 0,
                opacity: 3
            };
        case SwipeStates.LEFTER_THAN_CHOSEN:
            return {
                scale: 0.87,
                x: "-100%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.LEFTER_THAN_VISIBLE:
            return{
                scale: 0.87,
                x: "-120%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.RIGHTER_THAN_CHOSEN:
            return {
                scale: 0.87,
                x: "+100%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.RIGHTER_THAN_VISIBLE:
            return{
                scale: 0.87,
                x: "+120%",
                opacity: 0.5,
                zIndex: 2
            };
        default:
            alert("Wrong card state : " + swipeState)
    }
}

export default NewCardForm;