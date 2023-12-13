import React, {useState} from 'react';
import '../../style/trainingpage/finishedsetelement.css'
import '../../style/trainingpage/unfinishedsetelement.css'

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

const ExerciseCard = ({name, units, sets}) => {
    let [xShift, setXShift] = useState(0);
    let [yShift, setYShift] = useState(0);

    return (
        <div>
            <div className={"exercise-card"}>
                <div className={"exercise-name-div"}>
                    <p>{name}</p>
                </div>

                <FinishedSetElement index={0} amount={250} units={"kg"} reps={12}/>
                <FinishedSetElement index={1} amount={250} units={"kg"} reps={13}/>
                <FinishedSetElement index={2} amount={250} units={"kg"} reps={14}/>

                <UnfinishedSetElement index={3} units={"kg"}/>
            </div>
        </div>
    );
};

export default ExerciseCard;