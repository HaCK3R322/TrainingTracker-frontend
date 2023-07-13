import React, {useEffect, useState} from 'react';
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

const MainPage: React.FC = () => {
    const [trainings, setTrainings] = useState<Training[]>(getTrainings);

    let bp: ButtonProps[] = trainings.map(training => {
        return {text: training.name, action: testAction}
    })

    return (
            <div>
                <Header/>
                <TrainingsButtonsComposer buttonsProps={bp}/>
            </div>
    );
}

export default MainPage;