import React, {CSSProperties} from 'react';
import Header from "./Header";
import Training from "../api/entities/Training";

import TrainingsButtonsComposer, {TrainingButtonProps} from "./TrainingsButtonsComposer";

import {motion} from "framer-motion";

type MainPageProps = {
    trainings: Training[]
}

const MainPage: React.FC<MainPageProps> = (props) => {

    let buttonsProps: TrainingButtonProps[] = props.trainings.map(training => {
            return {
                id: training.id,
                text: training.name
            }
        }
    )

    const addTrainingMock = () => {

    }

    return (
        <motion.div
            initial={{x: -window.innerWidth}}
            animate={{x: 0}}
            exit={{x: -window.innerWidth}}
            transition={{ duration: 0.5}}

            key={'MainPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: window.innerWidth + 'px',
                height: window.innerHeight + 'px'
            }}
                 key="MainPage-Wrapper"
            >
                <Header key={'Header'}/>

                <div style={headerTextStyle}>
                    TrainingTracker
                </div>

                <TrainingsButtonsComposer key={'TrainingsButtonsComposer'} buttonsProps={buttonsProps}/>

                <button key={'add-button'} style={newTrainingButtonStyle} onClick={addTrainingMock}>
                    +
                </button>
            </div>
        </motion.div>
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

const headerTextStyle: CSSProperties = {
    position: 'absolute',

    color: 'white',
    fontSize: '12px',
    fontFamily: 'Sans-Serif',

    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))',

    textShadow: '1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black',

    top: '15px',
    left: '15px',
    height: '20px',
    margin: '0',
    padding: '0',
}

export default MainPage;