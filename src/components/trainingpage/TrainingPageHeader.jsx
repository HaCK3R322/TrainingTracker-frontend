import React, {useState} from 'react';
import '../../style/trainingpage/trainingpageheader.css'
import {motion} from "framer-motion";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import calendarIMG from "../../images/calendar.png"
import restoreIMG from '../../images/restore.png'
import dayjs from "dayjs";

const TrainingPageHeader = ({dateCalendarValue, onClickCallback}) => {
    return (
        <motion.div className={"header"}>
            <motion.div className={"calendar-div"} onTap={onClickCallback}>
                <img src={calendarIMG}/>
            </motion.div>

            <div className={"current-day"}>
                {dayjs(dateCalendarValue).format('DD.MM')}
            </div>

            <div className={"restore"} onTap={() => console.log("Coming soon...")}>
                <img src={restoreIMG}/>
            </div>
        </motion.div>
    );
};

export default TrainingPageHeader;