import React from 'react';
import {motion} from "framer-motion";


const TrainingButton = ({name, index, action}) => {
    const calcTopValue = () => {
        let headerSize = "10% + ";
        let logoSize = "40px + 40px + 31px";
        let initialSpace = " + 20px + ";

        let sizeNumberOfButtons = index * (20 + 70) + "px"

        return "calc(" + headerSize + logoSize + initialSpace + sizeNumberOfButtons + ")"
    }

    return (
        <div>
            <motion.button
                whileTap={{scale: 0.9}}

                className={"training-button"}
                style={{top: calcTopValue()}}
                onClick={action}
            >
                {name.toUpperCase()}
            </motion.button>
        </div>
    );
};

export default TrainingButton;