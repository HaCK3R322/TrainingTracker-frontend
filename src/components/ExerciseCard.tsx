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
        <div style={{...SetRowStyle, top: (props.num - 1) * 50 + 30 + 'px'}}>
            <div style={CommonSetRowTextStyle}>
                {props.num} set:
            </div>
            <div style={{...CommonSetRowTextStyle, left: "20%",
                borderWidth: "2px",
                borderStyle: "solid",
            }}>
                {props.reps}
            </div>
            <div style={{...CommonSetRowTextStyle, left: "40%"}}>
                reps
            </div>
            <div style={{...CommonSetRowTextStyle, left: "60%",
                borderWidth: "2px",
                borderStyle: "solid",
            }}>
                {props.amount}
            </div>
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
                        <SetRow num={index + 1} reps={set.reps} amount={set.amount} units={props.units} key={props.sets[index].id}/>
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