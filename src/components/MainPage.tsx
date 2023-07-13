import React, {CSSProperties, useEffect, useState} from 'react';
import Header from "./Header";
import Training from "../api/entities/Training";

import TrainingsButtonsComposer, {TrainingsButtonsComposerProps, ButtonProps} from "./TrainingsButtonsComposer";
import {getTrainings} from "../api/mocks";
import training from "../api/entities/Training";


let testAction = () => {
    let color = (document.querySelector("body") as HTMLBodyElement)
        .style.backgroundColor;

    if(color === "blue") {
        (document.querySelector("body") as HTMLBodyElement)
            .style.backgroundColor = "red"
    } else if(color == "red") {
        (document.querySelector("body") as HTMLBodyElement)
            .style.backgroundColor = "black"
    } else {
        (document.querySelector("body") as HTMLBodyElement)
            .style.backgroundColor = "blue"
    }

}

let idd = 100;

const MainPage: React.FC = () => {
    const [trainings, setTrainings] = useState<Training[]>(getTrainings);

    let bp: ButtonProps[] = trainings.map(training => {
        return {text: training.name, action: testAction}
    })

    const addRandomShit = () => {
        console.log('Yeah')

        const nextTrainings = [...trainings, {id: ++idd, name: "test", }]

        setTrainings(nextTrainings)
    }

    return (
            <div>
                <Header/>
                <TrainingsButtonsComposer buttonsProps={bp}/>
                <button style={newTrainingButtonStyle} onClick={addRandomShit}>
                    +
                </button>
            </div>
    );
}

const newTrainingButtonStyle: CSSProperties = {
    position: 'absolute',
    fontSize: '40px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: '15px'
}

export default MainPage;