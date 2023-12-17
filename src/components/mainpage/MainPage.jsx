import React, {useEffect, useState} from 'react';
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
import '../../style/mainpage/newtrainingform.css'
import okaymark from "../../images/okaymark.png";

const NewTrainingForm = ({setInvisibleCallback, index, addTraining}) => {
    const [name, setName] = useState("");
    const [nameAcceptable, setNameAcceptable] = useState(false);
    useEffect(() => {
        if(name !== "") {
            setNameAcceptable(true);
        } else {
            setNameAcceptable(false);
        }
    }, [name]);

    const dismiss = () => {
        setName("");
        setInvisibleCallback();
    }

    const calcTopValue = () => {
        let headerSize = "10%";
        let logoSize = "110px";

        let sizeNumberOfButtons = index * (20 + 70) + "px"

        return "calc(" +
            headerSize + " + " +
            logoSize + " + " +
            sizeNumberOfButtons +
            ")"
    }

    return(
        <div className={"new-training-form"}>
            <div
                className={"new-training-form-background"}
                onClick={() => {
                    if(nameAcceptable) {
                        let newTraining = {name: name};
                        addTraining(newTraining);
                    }
                    dismiss();
                }}
            />

            <input
                value={name}
                style={{
                    top: calcTopValue(),
                }}
                onChange={(event) => {
                    event.stopPropagation();
                    setName(event.target.value.toUpperCase());
                }}
            />
        </div>
    )
}

const MainPage = () => {
    let navigate = useNavigate();

    const [trainings, setTrainings] = useState([
        {name: "arms and back"},
        {name: "chest"},
        {name: "legs"},
        {name: "base"}
    ])
    const [newTrainingFormVisible, setNewTrainingFormVisible] = useState(false);
    const addTraining = (newTraining) => {
        let newTrainings = [...trainings];
        newTrainings.push(newTraining);
        setTrainings(newTrainings);
    }

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

                        {trainings.map((button, index) =>
                            <TrainingButton name={button.name} key={button.name} action={() => {navigate("/training")}} index={index}/>
                        )}

                        {trainings.length < 6 &&
                            <NewTrainingButton index={trainings.length} action={() => {setNewTrainingFormVisible(true)}}/>
                        }

                        {newTrainingFormVisible &&
                            <NewTrainingForm
                                setInvisibleCallback={() => {setNewTrainingFormVisible(false)}}
                                index={trainings.length}
                                addTraining={addTraining}
                            />
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MainPage;