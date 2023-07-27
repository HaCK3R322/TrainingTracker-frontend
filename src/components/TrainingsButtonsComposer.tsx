import React, {CSSProperties} from 'react';

import './../css/TrainingsButtonsComposer.css'
import {Link, useNavigate} from "react-router-dom";

function calculateOffset(numberOfButtons: number, index: number): number {
    const buttonHeightPixels: number = 120;

    let H: number = window.innerHeight - 180;  // КОСТЫЛИ НО МНЕ ПОЕБАТЬ
    let h: number = numberOfButtons * buttonHeightPixels;
    let topOffsetPixels = (H - h) / 2;

    if(topOffsetPixels < 50) topOffsetPixels = 50;

    let buttonOffsetPixels: number = buttonHeightPixels * index + topOffsetPixels;

    return buttonOffsetPixels;
}

const TrainingsButtonsComposer: React.FC<TrainingsButtonsComposerProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div style={TrainingsButtonsComposerStyle} id={'TrainingsButtonsComposer'}>
            {props.buttonsProps.map((buttonProps, index) =>
                {
                    const navigateToTraining = () => {
                        navigate('training/' + buttonProps.id)
                    }

                    return(
                        <button key={buttonProps.id} onClick={navigateToTraining} style={{
                            position: 'absolute',
                            width: '75%',
                            height: '100px',
                            top: `${calculateOffset(props.buttonsProps.length, index)}px`,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            font: 'Sans-Serif',
                            fontSize: '16px',
                            color: 'black',
                            backgroundColor: '#D9D9D9'
                        }}>
                            {buttonProps.text}
                        </button>
                    )
                }
            )}
        </div>
    );
};

const TrainingsButtonsComposerStyle: CSSProperties = {
    position: 'absolute',

    margin: '0',
    padding: '0px',
    width: '100%',
    height: 'calc(100% - 130px)',

    left: '50%',
    transform: 'translate(-50%, 0%)',
    top: '50px',

    overflow: 'scroll',

    backgroundColor: 'black'
}

export interface TrainingButtonProps {
    id: number
    text: string
}

export interface TrainingsButtonsComposerProps {
    buttonsProps: Array<TrainingButtonProps>
}

export default TrainingsButtonsComposer;