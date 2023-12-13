import React, {useEffect, useRef, useState} from 'react';
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'
import {wait} from "@testing-library/user-event/dist/utils";
import {motion, useMotionValue} from "framer-motion";

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


let a = 0;

const ExerciseCard = ({name, units, sets}) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dist, setDist] = useState(0);

    const handleDragStart = (info) => {
        setDragStart(info.point.x);
    }

    const handleOnDrag = (info) => {
        setDist(info.point.x - dragStart);
    }

    const handleDragEnd = (info) => {
        let dragEnd = info.point.x;
        if(dragStart - dragEnd > 200) {
            setSwipedRight(false);
        } else if (dragStart - dragEnd < -200) {
            setSwipedRight(true);
        }
        setDist(0);
    }


    return (
        <div>
            <motion.div className={"exercise-card"}
                        drag={"x"}
                        dragSnapToOrigin={true}
                        onDragStart={ (event, info) => {handleDragStart(info)} }
                        onDragEnd={ (event, info) => {handleDragEnd(info)} }
                        onDrag={ (event, info) => {handleOnDrag(info)} }

                        style={{
                            backgroundColor: swipedRight ? "yellow" : "green"
                        }}
            >
                <div className={"exercise-name-div"}>
                    {dist}
                </div>

                <FinishedSetElement index={0} amount={250} units={"kg"} reps={12}/>
                <FinishedSetElement index={1} amount={250} units={"kg"} reps={13}/>
                <FinishedSetElement index={2} amount={250} units={"kg"} reps={14}/>
                <FinishedSetElement index={3} amount={250} units={"kg"} reps={14}/>

                <UnfinishedSetElement index={4} units={"kg"}/>
            </motion.div>
        </div>
    );
};

export default ExerciseCard;