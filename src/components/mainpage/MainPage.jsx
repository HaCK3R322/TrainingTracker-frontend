import React from 'react';
import '../../style/theme.css'
import '../../style/mainpage/mainpage.css'
import gitHubIconSvg from '../../images/github-mark-white.svg'
import TrainingButton from "./TrainingButton";
import NewTrainingButton from "./NewTrainingButton";
import {motion} from "framer-motion";


const MainPage = () => {

    return (
        <motion.div
            initial={{x: -1}}
            animate={{x: 0}}
            exit={{x: -1}}
            transition={{ duration: 0.3}}

            key={'MainPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: 100 + '%',
                height: 100 + '%',
            }}
                 key="MainPage-Wrapper"
            >
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>

                        <div className={"header"}/>

                        <div className={"static-logo"}>
                            <p>TRAINING TRACKER</p>
                            <img className={"static-logo-github-icon"} src={gitHubIconSvg} alt={"lol xd"}/>
                        </div>

                        <TrainingButton name={"Legs"} action={() => {alert("coming soon...")}} index={0}/>
                        <TrainingButton name={"back"} action={() => {alert("coming soon...")}} index={1}/>
                        <TrainingButton name={"chest"} action={() => {alert("coming soon...")}} index={2}/>

                        <NewTrainingButton index={3} action={() => {alert("coming soon...")}}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MainPage;