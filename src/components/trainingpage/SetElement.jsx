import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";

const SetElement = ({exerciseId, initialReps, units, initialAmount, index, id, patchSetCallback}) => {
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
        let setPatch = {
            id: id,
            exerciseId: exerciseId,
            amount: amount,
            reps: reps
        }

        patchSetCallback(setPatch)
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