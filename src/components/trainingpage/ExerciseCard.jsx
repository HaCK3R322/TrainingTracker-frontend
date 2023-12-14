import React, {useEffect, useRef, useState} from 'react';
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'
import {wait} from "@testing-library/user-event/dist/utils";
import {motion, useMotionValue} from "framer-motion";

const cardStates = {
    CENTRAL: 'CENTRAL',

    LEFTER_THAN_VISIBLE: 'LEFTER_THAN_VISIBLE',
    LEFTER_THAN_CHOSEN: 'LEFTER_THAN_CHOSEN',

    RIGHTER_THAN_VISIBLE: 'RIGHTER_THAN_VISIBLE',
    RIGHTER_THAN_CHOSEN: "RIGHTER_THAN_CHOSEN",
}

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
                {amount}
            </div>

            <div className={"units-container-div"}>
                {units}
            </div>

            <div className={"reps"}>
                {reps}
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



const ExerciseCard = ({name, units, sets, swipedRightCallback, swipedLeftCallback, swipeState}) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [animateState, setAnimateState] = useState({zIndex: 3});

    const handleDragStart = (info) => {
        setDragStart(info.point.x);

    }

    const [startedSwipingToRight, setStartedSwipingToRight] = useState(false);
    const [startedSwipingToLeft, setStartedSwipingToLeft] = useState(false);
    const [basedZIndex, setBasedZIndex] = useState(1);
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

        if(distance > 5) {
            setStartedSwipingToRight(true);
            setStartedSwipingToLeft(false);
        } else if(distance < -5) {
            setStartedSwipingToRight(false);
            setStartedSwipingToLeft(true);
        } else {
            setStartedSwipingToRight(false);
            setStartedSwipingToLeft(false);
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

    useEffect(() => {
        if(swipeState === cardStates.LEFTER_THAN_CHOSEN) {
            setBasedZIndex(2);
        } else {
            setBasedZIndex(1);
        }
    }, [startedSwipingToRight]);

    function getAnimateStateBasedBySwipeState() {
        switch(swipeState) {
            case cardStates.CENTRAL:
                return {
                    zIndex: 3,
                    x: 0,
                    opacity: 3
                };
            case cardStates.LEFTER_THAN_CHOSEN:
                return {
                    scale: 0.87,
                    x: "-50px",
                    opacity: 1,
                    zIndex: basedZIndex
                };
            case cardStates.LEFTER_THAN_VISIBLE:
                return{
                    scale: 0.87,
                    x: "-120%",
                    opacity: 1,
                    zIndex: basedZIndex
                };
            case cardStates.RIGHTER_THAN_CHOSEN:
                return {
                    scale: 0.87,
                    x: "+50px",
                    opacity: basedZIndex,
                };
            case cardStates.RIGHTER_THAN_VISIBLE:
                return{
                    scale: 0.87,
                    x: "+120%",
                    opacity: 1,
                    zIndex: basedZIndex
                };
            default:
                alert("Wrong card state : " + swipeState)
        }
    }

    useEffect(() => {
        let newAnimateState = getAnimateStateBasedBySwipeState();
        setAnimateState(newAnimateState);
    }, [swipeState]);

    return (
        <motion.div className={"exercise-card"}
                    drag={"x"}
                    dragSnapToOrigin={true}
                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}

                    transition={{duration: 0.1}}
                    animate={animateState}

                    style={{
                        zIndex: basedZIndex
                    }}
        >
            <div className={"exercise-name-div"}>
                <p>{name}</p>
            </div>

            {sets.map((set, index) =>
                <FinishedSetElement index={index} amount={set.amount} units={units} reps={set.reps}/>
            )}

            <UnfinishedSetElement index={sets.length} units={"kg"}/>
        </motion.div>
    );
};

export default ExerciseCard;