import React, {useState} from 'react';
import '../../style/trainingpage/trainingpageheader.css'
import {motion} from "framer-motion";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import calendarIMG from "../../images/calendar.png"

const TrainingPageHeader = ({onClickCallback}) => {
    const [prevDayExists, setPrevDayExists] = useState(true);
    const [nextDayExists, setNextDayExists] = useState(true);



    return (
        <motion.div className={"header"}>
            <motion.div className={"calendar-div"} onTap={onClickCallback}>
                <img src={calendarIMG}/>
            </motion.div>

            <div className={"current-day"}>
                17.03
            </div>

            <div className={"new-day"}>
                NEW
            </div>
        </motion.div>
    );
};

export default TrainingPageHeader;