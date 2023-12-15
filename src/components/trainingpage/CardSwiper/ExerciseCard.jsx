import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import '../../../style/trainingpage/finishedsetelement.css'
import '../../../style/trainingpage/unfinishedsetelement.css'
import SwipeStates from "./SwipeStates.json"

const ExerciseCard = ({
                          name,
                          units,
                          sets,
                          swipedRightCallback,
                          swipedLeftCallback,
                          swipeState
}) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [animateState, setAnimateState] = useState({zIndex: 3});

    useEffect(() => {setAnimateState(getAnimationBasedOnSwipeState(swipeState));}, [swipeState]);

    const handleDragStart = (info) => {
        setDragStart(info.point.x);
    }

    const handleOnDrag = (info) => {
        let dragEnd = info.point.x;
        let distance = dragStart - dragEnd;

        if(distance > 100) {
            setSwipedRight(false);
            setSwipedLeft(true);
        } else if (distance < -100) {
            setSwipedRight(true);
            setSwipedLeft(false);
        } else {
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
        <motion.div className={"exercise-card"}
                    drag={"x"}
                    dragSnapToOrigin={true}
                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}

                    transition={{duration: 0.1}}
                    animate={animateState}
        >
            <div className={"exercise-name-div"}>
                <p>{name}</p>
            </div>

            {sets.map((set, index) =>
                <FinishedSetElement index={index} amount={set.amount} units={units} reps={set.reps}/>
            )}

            {sets.length < 5 ? <UnfinishedSetElement index={sets.length} units={"kg"}/> : <div/>}
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
        // alert(`for index ${index} = ${resultTopValue}`)
        return `calc(${resultTopValue})`;
    }

    return(
        <div className={"set-div"}
             style={{top: calcSetTopValue(index)}}
        >
            <div className={"amount"}>
                <input defaultValue={amount} type={"number"}/>
            </div>

            <div className={"units-container-div"}>
                {units}
            </div>

            <div className={"reps"}>
                <input defaultValue={reps} type={"number"}/>
            </div>
        </div>
    )
}

const UnfinishedSetElement = ({index, units}) => {
    function calcSetTopValue(index) {
        let nameDivSize = 100; //px
        let betweenSetsSpace = 15; //px
        let selfSize = 35; //px

        let prevSetsSize = index * (betweenSetsSpace + selfSize);

        let resultTopValue = `${nameDivSize}px + ${prevSetsSize}px`
        // alert(`for index ${index} = ${resultTopValue}`)
        return `calc(${resultTopValue})`;
    }

    return(
        <div className={"unfinished-set-div"}
             style={{top: calcSetTopValue(index)}}
        >
            <div className={"amount"}/>
            <div className={"units-container-div"}>
                {units}
            </div>
            <div className={"reps"}/>
        </div>
    )
}

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

export default ExerciseCard;