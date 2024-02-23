import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'
import SwipeStates from "./SwipeStates.json"
import trashCanIcon from '../../images/trash-can-icon.png'
import SetElement from "./SetElement";

const ExerciseCard = ({
                          exercise,
                          createNewSetCallback,
                          patchSetCallback,

                          swipedRightCallback,
                          swipedLeftCallback,
                          swipeState,
                          swapToRightCallback,
                          swapToLeftCallback,
                          selfDeleteCallback,
                          deleteLastSetCallback
}) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(0);
    const [animateState, setAnimateState] = useState({zIndex: 3});

    const [dragStartTime, setDragStartTime] = useState(Number.MAX_VALUE);
    const [isDragStartTimeUpdated, setIsDragStartTimeUpdated] = useState(false);
    const [isLongDragging, setIsLongDragging] = useState(false);
    const [swappedWithRight, setSwappedWithRight] = useState(false);
    const [swappedWithLeft, setSwappedWithLeft] = useState(false);

    const handleOnDelete = () => {
        if(swipeState === SwipeStates.CENTRAL) { // check if we are central card
            selfDeleteCallback()
        }
    }

    useEffect(() => {
        setIsDragStartTimeUpdated(true);
    }, [dragStartTime]);

    useEffect(() => {
        if(isLongDragging === true) {
            if(swappedWithLeft || swappedWithRight) navigator.vibrate(100);

            if(swappedWithRight) {
                swapToRightCallback();
                setSwappedWithRight(true);
                setSwappedWithLeft(false);
            }
            if(swappedWithLeft) {
                swapToLeftCallback();
                setSwappedWithLeft(true);
                setSwappedWithRight(false);
            }

            setIsLongDragging(false);
            setDragStartTime(Date.now());
        }
    }, [isLongDragging, swappedWithRight, swappedWithLeft]);


    useEffect(() => {
        let animateState = null;

        switch(swipeState) {
            case SwipeStates.CENTRAL:
                animateState = {
                    zIndex: 3,
                    x: "0%",
                    opacity: 3
                };
                break;
            case SwipeStates.LEFTER_THAN_CHOSEN:
                animateState = {
                    scale: 0.87,
                    x: "-100%",
                    opacity: 0.5,
                    zIndex: 2
                };
                break;
            case SwipeStates.LEFTER_THAN_VISIBLE:
                animateState = {
                    scale: 0.87,
                    x: "-120%",
                    opacity: 0.5,
                    zIndex: 2
                };
                break;
            case SwipeStates.RIGHTER_THAN_CHOSEN:
                animateState = {
                    scale: 0.87,
                    x: "+100%",
                    opacity: 0.5,
                    zIndex: 2
                };
                break;
            case SwipeStates.RIGHTER_THAN_VISIBLE:
                animateState = {
                    scale: 0.87,
                    x: "+120%",
                    opacity: 0.5,
                    zIndex: 2
                };
                break;
            default:
                alert("Wrong card state : " + swipeState)
        }

        setAnimateState(animateState);
    }, [swipeState]);

    const handleDragStart = (info) => {
        setDragStartPoint(info.point.x);
        setDragStartTime(Date.now());
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

        if(isDragStartTimeUpdated) {
            let dragTime = Date.now() - dragStartTime;
            if(dragTime > 1500) {
                setIsLongDragging(true);

                if(distance > 100) { // --->
                    setSwappedWithRight(true);
                    setSwappedWithLeft(false);
                } else if (distance < -100) { // <---
                    setSwappedWithLeft(true);
                    setSwappedWithRight(false);
                } else { // <->
                    setSwappedWithLeft(false);
                    setSwappedWithRight(false);
                }
            }
        }
    }
    const handleDragEnd = (info) => {
        if(swipedLeft && !swappedWithLeft) {
            swipedLeftCallback();
        }
        if(swipedRight && !swappedWithRight) {
            swipedRightCallback();
        }

        setSwipedRight(false);
        setSwipedLeft(false);

        setSwappedWithLeft(false);
        setSwappedWithRight(false);

        setIsDragStartTimeUpdated(false);
        setIsLongDragging(false);
    }

    return (
        <motion.div className={"exercise-card"}
                    drag={"x"}
                    dragSnapToOrigin={true}

                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}

                    transition={{duration: 0.1}}
                    animate={animateState}
        >
            <div className={"exercise-name-div"}>
                <p>{exercise.name.toLowerCase()}</p>
            </div>

            {exercise
                .sets
                .sort((a, b) => a.id - b.id)
                .map((set, index) =>
                    <SetElement
                        exerciseId={exercise.id}
                        initialAmount={set.amount}
                        units={exercise.units}
                        initialReps={set.reps}

                        index={index}
                        key={index}
                        id={set.id}
                        patchSetCallback={patchSetCallback}
                    />
                )
            }

            <motion.div className={"buttons-footer"}>

                <motion.div
                    className={"delete-button"}
                    onTap={handleOnDelete}
                >
                    <img src={trashCanIcon} alt={"delete"} />
                </motion.div>

                <motion.div
                    className={"delete-set-button-hitbox"}
                    onTap={() => {
                        deleteLastSetCallback()
                    }}
                >
                    <div className={"delete-set-button"}/>
                </motion.div>

                <motion.div
                    className={"create-new-set-button-hitbox"}
                    onTap={() => {
                        createNewSetCallback()
                    }}
                >
                    <div className={"create-new-set-button-vertical"}/>
                    <div className={"create-new-set-button-horizontal"}/>
                </motion.div>

            </motion.div>

        </motion.div>
    );
};

export default ExerciseCard;