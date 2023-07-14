import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import Header from "./Header";
import Training from "../api/entities/Training";

import TrainingsButtonsComposer, {TrainingsButtonsComposerProps, TrainingButtonProps} from "./TrainingsButtonsComposer";
import {getTrainings} from "../api/mocks";
import training from "../api/entities/Training";
import {Link, useLoaderData, useNavigate} from "react-router-dom";


const MainPage: React.FC = () => {

    const [trainings, setTrainings] = useState<Training[]>(useLoaderData() as Training[]);

    let buttonsProps: TrainingButtonProps[] = trainings.map(training => {
            return {
                id: training.id,
                text: training.name
            }
        }
    )

    const addTrainingMock = () => {
        alert('Hehe')
    }

    return (
            <div>
                <Header/>

                <TrainingsButtonsComposer buttonsProps={buttonsProps}/>

                <button style={newTrainingButtonStyle} onClick={addTrainingMock}>
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
    bottom: '15px',

    backgroundColor: 'white'
}

export default MainPage;