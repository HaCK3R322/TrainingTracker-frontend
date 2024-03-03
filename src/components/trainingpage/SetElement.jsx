import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {ExercisesContext} from "./contexts/ExercisesContext";

const SetElement = ({exerciseId, initialReps, units, initialAmount, index, id}) => {
    const exercisesContext = useContext(ExercisesContext)
    const [
        exercises,
        setExercises,
        patchSet
    ] = [
        exercisesContext.exercises,
        exercisesContext.setExercises,
        exercisesContext.patchSet
    ]

    const [amount, setAmount] = useState(initialAmount);
    const [reps, setReps] = useState(initialReps);

    function calcSetTopValue(index) {
        let nameDivSize = 100; //px
        let betweenSetsSpace = 15; //px
        let selfSize = 35; //px

        let prevSetsSize = index * (betweenSetsSpace + selfSize);

        let resultTopValue = `${nameDivSize}px + ${prevSetsSize}px`
        return `calc(${resultTopValue})`;
    }

    useEffect(() => {
        let set = {
            id: id,
            exerciseId: exerciseId,
            amount: amount,
            reps: reps
        }

        // eslint-disable-next-line no-unused-vars
        const ignored = patchSet(set)

        let exerciseIndex = exercises.findIndex(ex => ex.id === set.exerciseId);

        let setIndex = (exercises[exerciseIndex]).sets.findIndex(s => s.id === set.id)

        let newExercises = [...exercises]
        newExercises[exerciseIndex].sets[setIndex] = set;
        setExercises(newExercises)

    }, [amount, reps]);

    return(
        <div className={"set-div"}
             style={{top: calcSetTopValue(index)}}
        >
            <motion.div className={"amount"}>
                <motion.input
                    defaultValue={amount}
                    type={"number"}
                    onTap={(event) => event.target.focus()}
                    onChange={event => setAmount(event.target.value)}
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
                    onChange={event => setReps(event.target.value)}
                />
            </div>
        </div>
    )
}

export default SetElement;