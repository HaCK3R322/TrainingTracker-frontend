import React, {CSSProperties, useEffect, useState} from 'react';
import {isNumber, isString} from "util";
import {fetchUpdateSet} from "../api/Sets";
import '../api/entities/Set'

type ExerciseFormProps = {
    units: string
    sets: SetProps[],
    name: string
}

type SetProps = {
    id: number
    reps: number
    amount: number
}

type SetRowProps = {
    num: number
    reps: number
    amount: number
    units: string
    id: number
}

const validateNumber = (inputStr: string) => {
    let parsedInteger: number = parseInt(inputStr);

    if(Number.isNaN(parsedInteger)) {
        return false;
    }

    if(parsedInteger.toString().length !== inputStr.length) {
        return false;
    }

    return true;
}

const SetRow: React.FC<SetRowProps> = (props) => {
    let [reps, setReps] = useState(props.reps);
    let [amount, setAmount] = useState(props.amount)

    useEffect(() => {
        fetchUpdateSet({
            id: props.id,
            reps: reps,
            amount: amount,
            timestamp: "1999-01-01T23:23:23.003",
            exerciseId: NaN
        })
    }, [reps, amount])

    return(
        <div style={{...SetRowStyle, top: (props.num - 1) * 50 + 30 + 'px'}}>
            <div style={CommonSetRowTextStyle}>
                {props.num} set:
            </div>

            <input style={{...CommonSetRowTextStyle, left: "20%",
                borderWidth: "2px",
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: '20px',
                height: '25px'
            }}
                   id={"repsInput" + props.num}

                   defaultValue={reps}
                   onChange={() => {
                       let thisElement = document.getElementById("repsInput" + props.num);
                       if(thisElement instanceof HTMLInputElement) {
                           if (validateNumber(thisElement.value)) {
                               let newReps: number = parseInt(thisElement.value)
                               setReps(newReps)
                               thisElement.style.backgroundColor = 'transparent';
                           } else {
                               thisElement.style.backgroundColor = 'red';
                           }
                       }
                   }}
            />

            <div style={{...CommonSetRowTextStyle, left: "40%"}}>
                reps
            </div>

            <input style={{...CommonSetRowTextStyle, left: "60%",
                borderWidth: "2px",
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: '20px',
                height: '25px'
            }}
                   id={"amountInput" + props.num}

                   defaultValue={amount}
                   onChange={() => {
                       let thisElement = document.getElementById("amountInput" + props.num);
                       if(thisElement instanceof HTMLInputElement) {
                           if (validateNumber(thisElement.value)) {
                               let newAmount: number = parseInt(thisElement.value)
                               setAmount(newAmount)
                               thisElement.style.backgroundColor = 'transparent';
                           } else {
                               thisElement.style.backgroundColor = 'red';
                           }
                       }
                   }}
            />

            <div style={{...CommonSetRowTextStyle, left: "80%"}}>
                {props.units}
            </div>
        </div>
    )
}

const CommonSetRowTextStyle: CSSProperties = {
    position: 'absolute',
    width: "20%",
    top: "50%",
    transform: "translate(0, -50%)"
}

const ExerciseCard: React.FC<ExerciseFormProps> = (props) => {
    return (
        <div style={{...ExerciseStyle, height: 30 + props.sets.length * 50 + 'px'}}>
            <div style={ExerciseNameStyle}>
                {props.name}
            </div>
            {
                props.sets.map((set, index) => {
                    return(
                        <SetRow
                            num={index + 1}

                            reps={set.reps}
                            amount={set.amount}
                            units={props.units}
                            id={props.sets[index].id}

                            key={props.sets[index].id}
                        />
                    )
                })
            }
        </div>
    );
};

const ExerciseStyle: CSSProperties = {
    position: 'absolute',
    width: '75%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#D9D9D9'
}

const ExerciseNameStyle: CSSProperties = {
    fontSize: '24px',
    width: '100%',
    height: '30px',
    textAlign: 'center',
}

const SetRowStyle: CSSProperties = {
    width: '100%',
    height: '50px',
    backgroundColor: '#D9D9D9',
    margin: 0,
    padding: 0,
    textAlign: "center",
    position: 'absolute',
    fontSize: '20px'
}

export default ExerciseCard;