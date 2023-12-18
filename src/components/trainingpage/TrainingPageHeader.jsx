import React, {useState} from 'react';
import '../../style/trainingpage/trainingpageheader.css'
import {motion} from "framer-motion";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const TrainingPageHeader = () => {
    const [prevDayExists, setPrevDayExists] = useState(true);
    const [nextDayExists, setNextDayExists] = useState(true);



    return (
        <motion.div className={"header"}>
            {prevDayExists &&
                <div className={"previous-day"}>
                    10.10
                </div>
            }

            <div className={"current-day"}>
                17.03
            </div>

            {nextDayExists ?
                <div className={"next-day"}>
                    24.10
                </div>
                :
                <div className={"new-day"} />
            }
        </motion.div>
    );
};

export default TrainingPageHeader;