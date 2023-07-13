import React, {CSSProperties} from 'react';

import './../css/TrainingsButtonsComposer.css'

const TrainingsButtonsComposer: React.FC<TrainingsButtonsComposerProps> = (props) => {
    return (
        <div style={TrainingsButtonsComposerStyle} id={'TrainingsButtonsComposer'}>
            {props.buttonsProps.map((buttonProps, index) =>
                {
                    const buttonHeightPixels: number = 120;

                    let topOffsetPixels: number = 170;

                    let trainingsButtonsComposerElement = (document.getElementById('TrainingsButtonsComposer') as HTMLBodyElement)
                    if(trainingsButtonsComposerElement !== null) {
                        let H: number = trainingsButtonsComposerElement.offsetHeight;
                        let h: number = props.buttonsProps.length * buttonHeightPixels;
                        topOffsetPixels = (H - h) / 2;
                    }

                    let buttonOffsetPixels: number = buttonHeightPixels * index + topOffsetPixels;

                    return(
                        <button key={index} onClick={buttonProps.action} style={{
                            position: 'absolute',
                            width: '75%',
                            height: '100px',
                            top: `${buttonOffsetPixels}px`,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            font: 'Sans-Serif',
                            fontSize: '16px'
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
    height: 'calc(100% - 50px)',

    left: '50%',
    transform: 'translate(-50%, 0%)',
    top: '50px'
}

export interface ButtonProps {
    text: string,
    action: () => void
}

export interface TrainingsButtonsComposerProps {
    buttonsProps: Array<ButtonProps>
}

export default TrainingsButtonsComposer;