import React from 'react';
import {motion} from "framer-motion";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'


const Stats = ({isVisible, setVisible}) => {
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
                Hello world!
                Hello world!
                Hello world!
                Hello world!
                Hello world!
                Hello world!
                Hello world!
                Hello world!
            </div>
        </motion.div>
    );
};

export default Stats;