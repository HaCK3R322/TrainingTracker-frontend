import React, {CSSProperties} from 'react';

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
}

const SetRow: React.FC<SetRowProps> = (props) => {
    return(
        <div style={SetRowStyle}>
            {props.num} set: {props.reps} reps   {props.amount} {props.units}
        </div>
    )
}

const SetRowStyle: CSSProperties = {
    width: '100%',
    height: '50px',
    backgroundColor: 'yellow'
}

const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
    return (
        <div style={ExerciseStyle}>
            <div style={ExerciseNameStyle}> {props.name} </div>
            {
                props.sets.map((set, index) => {
                    return(
                        <SetRow num={index + 1} reps={set.reps} amount={set.amount} units={props.units}/>
                    )
                })
            }
        </div>
    );
};

const ExerciseStyle: CSSProperties = {
    backgroundColor: '#D9D9D9',
    width: '75%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

const ExerciseNameStyle: CSSProperties = {
    fontSize: '24px',
    width: '100%',
    height: '30px',
    textAlign: 'center'
}

export default ExerciseForm;