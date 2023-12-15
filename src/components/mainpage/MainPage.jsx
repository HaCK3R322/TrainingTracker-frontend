import React from 'react';
import NewTrainingButton from "./NewTrainingButton";
import TrainingButton from "./TrainingButton";
import {motion} from "framer-motion";
import {useNavigate} from "react-router";
import '../../style/theme.css'
import '../../style/mainpage/mainpage.css'
import '../../style/mainpage/newtrainingbutton.css'
import '../../style/mainpage/trainingbutton.css';
import '../../style/motion-framer-wrapper.css'
import gitHubIconSvg from '../../images/github-mark-white.svg'


const MainPage = () => {
    let navigate = useNavigate()

    return (
        <motion.div
            initial={{x: "-100%"}}
            animate={{x: "0%"}}
            exit={{x: "-100%"}}
            transition={{ duration: 0.3}}

            key={'MainPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height:  "100%"
            }}
        >
            <div className={"motion-framer-wrapper"} key={'MainPage-wrapper'}>
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>

                        <div className={"header"}/>

                        <div className={"static-logo"}>
                            <p>TRAINING TRACKER</p>
                            <img className={"static-logo-github-icon"} src={gitHubIconSvg} alt={"lol xd"}/>
                        </div>

                        <TrainingButton name={"Legs"} action={() => {navigate("/training")}} index={0}/>
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