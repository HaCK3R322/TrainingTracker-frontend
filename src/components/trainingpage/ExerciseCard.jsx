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



const ExerciseCard = ({name, units, sets, swipedRightCallback, swipedLeftCallback, swipeState}) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [releasedAndShouldBeLeft, setReleasedAndShouldBeLeft] = useState(false);

    const handleDragStart = (info) => {
        setDragStart(info.point.x);

    }
    const handleOnDrag = (info) => {

        let dragEnd = info.point.x;
        if(dragStart - dragEnd > 200) {
            setSwipedRight(false);
            setSwipedLeft(true);
        } else if (dragStart - dragEnd < -200) {
            setSwipedRight(true);
            setSwipedLeft(false);
        } else {
            setSwipedRight(false);
            setSwipedLeft(false);
        }

    }

    const handleDragEnd = (info) => {
        setSwipedRight(false);

        if(swipedLeft) {
            console.log("released and should be left")
            setReleasedAndShouldBeLeft(true);
        }
    }


    return (
        <motion.div className={"exercise-card"}
                    id={"123"}

                    drag={"x"}
                    dragSnapToOrigin={true}
                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}

                    animate={releasedAndShouldBeLeft ? {x: "-80%", zIndex: 0, scale: 0.95, opacity: 0.5} : {x: 0, zIndex: 3}}

                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}


                    style={{
                        backgroundColor: swipedRight ? "yellow" : swipedLeft ? "green" : "var(--second-color)"
                    }}
        >
            <div className={"exercise-name-div"}>
                <p>{name}</p>{swipeState}
            </div>

            <FinishedSetElement index={0} amount={250} units={"kg"} reps={12}/>
            <FinishedSetElement index={1} amount={250} units={"kg"} reps={13}/>
            <FinishedSetElement index={2} amount={250} units={"kg"} reps={14}/>
            <FinishedSetElement index={3} amount={250} units={"kg"} reps={14}/>

            <UnfinishedSetElement index={4} units={"kg"}/>
        </motion.div>
    );
};

export default ExerciseCard;