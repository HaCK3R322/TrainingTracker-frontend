import React, {useEffect, useRef, useState} from 'react';
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'
import {wait} from "@testing-library/user-event/dist/utils";
import {motion, useMotionValue} from "framer-motion";

const cardStates = {
    CENTRAL: 'CENTRAL',
    MOST_LEFT: 'MOST_LEFT',
    MOST_RIGHT: 'MOST_RIGHT',

    LEFTER_THAN_VISIBLE: 'LEFTER_THAN_VISIBLE',
    LEFTER_THAN_CHOSEN: 'LEFTER_THAN_CHOSEN',
    SECOND: 'SECOND',

    RIGHTER_THAN_VISIBLE: 'RIGHTER_THAN_VISIBLE',
    RIGHTER_THAN_CHOSEN: "RIGHTER_THAN_CHOSEN",
    PENULTIMATE: 'PENULTIMATE'
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
                <b>{amount}</b>
            </div>

            <div className={"units-container-div"}>
                {units}
            </div>

            <div className={"reps"}>
                <b>{reps}</b>
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

    const handleDragStart = (info) => {
        setDragStart(info.point.x);

    }
    const handleOnDrag = (info) => {

        let dragEnd = info.point.x;
        if(dragStart - dragEnd > 150) {
            setSwipedRight(false);
            setSwipedLeft(true);
        } else if (dragStart - dragEnd < -150) {
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

    const [animateState, setAnimateState] = useState({zIndex: 3});

    function getAnimateStateBasedBySwipeState() {
        switch(swipeState) {
            case cardStates.CENTRAL:
                setAnimateState({
                    zIndex: 3,
                    x: 0,
                    opacity: 1
                });
                break;
            case cardStates.LEFTER_THAN_CHOSEN:
                setAnimateState({
                    scale: 0.95,
                    x: "-95%",
                    opacity: 0.5,
                    zIndex: 1
                });
                break;
            case cardStates.LEFTER_THAN_VISIBLE:
                setAnimateState({
                    scale: 0.95,
                    x: "-195%",
                    opacity: 0,
                    zIndex: 1
                });
                break;
            case cardStates.RIGHTER_THAN_CHOSEN:
                setAnimateState({
                    scale: 0.95,
                    x: "95%",
                    opacity: 0.5,
                    zIndex: 1
                });
                break;
            case cardStates.RIGHTER_THAN_VISIBLE:
                setAnimateState({
                    scale: 0.95,
                    x: "195%",
                    opacity: 0,
                    zIndex: 1
                });
                break;
        }
    }

    useEffect(() => {
        getAnimateStateBasedBySwipeState()
    }, [swipeState]);

    return (
        <motion.div className={"exercise-card"}
                    id={"123"}

                    drag={"x"}
                    dragSnapToOrigin={true}
                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}

                    animate={animateState}
        >
            <div className={"exercise-name-div"}>
                <p>{name}</p>{swipeState}
            </div>

            {sets.map((set, index) =>
                <FinishedSetElement index={index} amount={set.amount} units={units} reps={set.reps}/>
            )}

            <UnfinishedSetElement index={sets.length} units={"kg"}/>
        </motion.div>
    );
};

export default ExerciseCard;