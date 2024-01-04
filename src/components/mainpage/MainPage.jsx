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
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import fetchGetAllUserTrainings from "../../api/fetchGetAllUserTrainings";
import fetchPost from "../../api/fetchPost";
import BackendUrls from "../../api/BackendUrls.json";

const MainPage = () => {
    let navigate = useNavigate();

    const [trainings, setTrainings] = useState(getTrainingFromCacheOrDefault())
    const [newTrainingFormVisible, setNewTrainingFormVisible] = useState(false);
    const addTraining = (newTraining) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("ПОКА ЧТО УДАЛИТЬ НЕЛЬЗЯ, ТОЧНО СОЗДАТЬ?")) {
            fetchPost(BackendUrls.urls.trainings, newTraining)
                .then(response => response.json())
                .then(createdTraining => {
                    let newTrainings = [...trainings];
                    newTrainings.push(createdTraining);
                    setTrainings(newTrainings);
                })
        }
    }

    useEffect(() => {
        fetchGetAllUserTrainings()
            .then(trainings => {
                setTrainings(trainings);
                cacheTrainings(trainings)
            })
    }, []);

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

                        {trainings.map((training, index) =>
                            <TrainingButton
                                name={training.name}
                                key={training.name}
                                action={() => {navigate("/training/" + training.id)}}
                                index={index}
                            />
                        )}

                        {trainings.length < 6 &&
                            <NewTrainingButton
                                index={trainings.length}
                                action={() => {setNewTrainingFormVisible(true)}}
                            />
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

function cacheTrainings(trainings) {
    window.localStorage.setItem("trainings-cached", JSON.stringify(trainings));
}

function getTrainingFromCacheOrDefault() {
    let trainings = JSON.parse(window.localStorage.getItem("trainings-cached"))

    return trainings === null ? [] : trainings
}


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

export default MainPage;