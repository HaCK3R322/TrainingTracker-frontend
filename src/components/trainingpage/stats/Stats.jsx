import React, {useContext, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import '../../../style/theme.css'
import '../../../style/trainingpage/trainingpage.css'
import '../../../style/motion-framer-wrapper.css'
import {ExercisesContext} from "../contexts/ExercisesContext";
import ErmGraphic from "./ErmGraphic";


const Stats = ({isVisible, setVisible}) => {
    const exercises = useContext(ExercisesContext).exercises

    const [erm, setErm] = useState([])

    useEffect(() => {
        if(isVisible) {
            const newErm = []
            exercises
                .filter(e => e.timestamp.isSame(Date.now(), 'day'))
                .sort((a, b) => a.timestamp.diff(b.timestamp))
                .forEach(e => {
                    let total_reps = 0;
                    e.sets.forEach(set => total_reps += set.reps)

                    let w = 0;
                    e.sets.forEach(set => w += set.amount * (set.reps / total_reps))

                    let r = total_reps / e.sets.length + (e.sets.length - 1)

                    newErm.push(
                        w * r * 0.0333 + w
                    )
                })
            setErm(newErm)
        }
    }, [isVisible]);

    return (
        <motion.div
            style={{
                width: '100%',
                height: "100%",
                backgroundColor: "green",
                zIndex: 4,
                position: "absolute"
            }}

            initial={{top: "100%"}}
            animate={isVisible ?
                {top: "0%"} :
                {top: "100%"}
            }

            onTap={() => setVisible(false)}
        >
            <ErmGraphic ermData={erm}/>
            <div className={"training-tracker-theme"}>
                {/*Estimated Rep Max:*/}
                {/*{erm.map((value, index) =>*/}
                {/*    <div key={index}>*/}
                {/*        {value}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </motion.div>
    );
};

export default Stats;