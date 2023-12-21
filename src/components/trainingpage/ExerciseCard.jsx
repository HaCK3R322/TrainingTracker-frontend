import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'
import SwipeStates from "./SwipeStates.json"
import trashCanIcon from '../../images/trash-can-icon.png'

const ExerciseCard = ({
                          name,
                          units,
                          sets,
                          setSets,

                          swipedRightCallback,
                          swipedLeftCallback,
                          swipeState,
                          swapToRightCallback,
                          swapToLeftCallback,
                          selfDeleteCallback
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

    const handleDeleteSet = () => {
        if(sets.length > 0) {
            let newSets = [...sets];
            newSets.splice(newSets.length - 1, 1);
            setSets(newSets);
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
        setAnimateState(getAnimationBasedOnSwipeState(swipeState));
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
                <p>{name.toLowerCase()}</p>
            </div>

            {sets.map((set, index) =>
                <FinishedSetElement index={index} amount={set.amount} units={units} reps={set.reps} key={index}/>
            )}

            {sets.length < 5 ?
                <UnfinishedSetElement index={sets.length} units={units} sets={sets} setSets={setSets}/>
                : <div/>
            }

            <motion.div className={"delete-button"} onTap={handleOnDelete}>
                <img src={trashCanIcon} alt={"delete"} />
            </motion.div>


            <motion.div className={"delete-set-button-hitbox"}
                onTap={handleDeleteSet}
            >
                <div className={"delete-set-button"}/>
            </motion.div>
        </motion.div>
    );
};

const FinishedSetElement = ({amount, units, reps, index}) => {
    function calcSetTopValue(index) {
        let nameDivSize = 100; //px
        let betweenSetsSpace = 15; //px
        let selfSize = 35; //px

        let prevSetsSize = index * (betweenSetsSpace + selfSize);

        let resultTopValue = `${nameDivSize}px + ${prevSetsSize}px`
        return `calc(${resultTopValue})`;
    }

    return(
        <div className={"set-div"}
             style={{top: calcSetTopValue(index)}}
        >
            <motion.div className={"amount"}>
                <motion.input
                    defaultValue={amount}
                    type={"number"}
                    onTap={(event) => event.target.focus()}
                />
            </motion.div>

            <div className={"units-container-div"}>
                {units}
            </div>

            <div className={"reps"}>
                <motion.input
                    defaultValue={reps}
                    type={"number"}
                    onTap={(event) => event.target.focus()}
                />
            </div>
        </div>
    )
}

const UnfinishedSetElement = ({index, units, sets, setSets}) => {
    function calcSetTopValue(index) {
        let nameDivSize = 100; //px
        let betweenSetsSpace = 15; //px
        let selfSize = 35; //px

        let prevSetsSize = index * (betweenSetsSpace + selfSize);

        let resultTopValue = `${nameDivSize}px + ${prevSetsSize}px`
        return `calc(${resultTopValue})`;
    }

    return(
        <motion.div className={"unfinished-set-div"}
             style={{top: calcSetTopValue(index)}}

             onTap={() => {
                 let newSets = [...sets];
                 newSets.push({amount: null, reps: null});
                 setSets(newSets);
             }}
        >
            <div className={"amount"}/>
            <div className={"units-container-div"}>
                {units}
            </div>
            <div className={"reps"}/>
        </motion.div>
    )
}

function getAnimationBasedOnSwipeState(swipeState) {
    switch(swipeState) {
        case SwipeStates.CENTRAL:
            return {
                zIndex: 3,
                x: "0%",
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

export default ExerciseCard;