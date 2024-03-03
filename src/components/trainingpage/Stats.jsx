import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'


const Stats = ({isVisible, setVisible, exercises}) => {
    let [stat1, setStat1] = useState([])
    let [stat2, setStat2] = useState([])

    useEffect(() => {
        if(isVisible) {
            let avg = []
            exercises
                .filter(e => {
                    return e.name === "squats"
                })
                .sort((a, b) => {
                    return a.timestamp.diff(b.timestamp)
                })
                .forEach(e => {
                    let avgSet = 0
                    e.sets.forEach(set => {
                        avgSet += set.amount * set.reps
                    })
                    avg.push(avgSet)
                })
            setStat1(avg)
        }
    }, [exercises, isVisible]);

    useEffect(() => {
        if(isVisible) {
            let avg = []
            exercises
                .filter(e => {
                    return e.name === "squats"
                })
                .sort((a, b) => {
                    return a.timestamp.diff(b.timestamp)
                })
                .forEach(e => {
                    let total_count_reps = 0
                    e.sets.forEach(set => {
                        total_count_reps += set.reps
                    })

                    let avgSet = 0
                    e.sets.forEach(set => {
                        avgSet += set.amount * (set.reps / total_count_reps)
                    })
                    avg.push(avgSet)
                })
            setStat2(avg)
        }
    }, []);

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
            <div className={"training-tracker-theme"}>
                Mass per exercise:
                {stat1.map((exercise, index) =>
                    <div key={index}>
                        {exercise}
                    </div>
                )}
                <br/>
                Avg weight:
                {stat2.map((exercise, index) =>
                    <div key={index}>
                        {exercise}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Stats;