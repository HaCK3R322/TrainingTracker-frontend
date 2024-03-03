import React from 'react';
import {motion} from "framer-motion";

const FramerMotionWrapperDiv = ({keyName, children}) => {
    return (
        <motion.div
            initial={{x: "100%"}}
            animate={{x: "0%"}}
            exit={{x: "100%"}}
            transition={{duration: 0.3}}

            key={keyName}

            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height:  "100%"
            }}
        >
            <div key={keyName + "-INSIDE"}

                style={{
                position: "relative",
                width: "100%",
                height: "100%"
            }}>
                {children}
            </div>
        </motion.div>
    );
};

export default FramerMotionWrapperDiv;