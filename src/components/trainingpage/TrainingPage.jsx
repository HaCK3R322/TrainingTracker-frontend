import React from 'react';
import '../../style/trainingpage/trainingpage.css'
import ExerciseCard from "./ExerciseCard";
import {motion} from "framer-motion";
import '../../style/motion-framer-wrapper.css'


const TrainingPage = () => {
    return (
        <motion.div
            initial={{x: "99%"}}
            animate={{x: "0%"}}
            exit={{x: "99%"}}
            transition={{duration: 0.3}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height:  "100%"
            }}
        >
            <div className={"motion-framer-wrapper"}   key="TrainingPage-Wrapper">
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>
                        <div className={"header"} />

                        <div className={"scroller-div"}>
                            <ExerciseCard
                                name={"leg press"}
                                units={"kg"}
                                sets={[
                                    {amount: 250, reps: 12},
                                    {amount: 250, reps: 12},
                                    {amount: 250, reps: 12}
                                ]}
                            />
                        </div>

                        <div className={"tipa-keyboard"}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;