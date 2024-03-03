import React, {useContext} from 'react';
import '../../style/trainingpage/trainingpageheader.css'
import {motion} from "framer-motion";
import calendarIMG from "../../images/calendar.png"
import restoreIMG from '../../images/restore.png'
import dayjs from "dayjs";
import {CalendarContext} from "./contexts/CalendarContext";

const TrainingPageHeader = ({restore}) => {
    const [
        calendarValue,
        calendarVisible,
        setCalendarVisible
    ] = [
        useContext(CalendarContext).dateValue,
        useContext(CalendarContext).isVisible,
        useContext(CalendarContext).setVisible
    ]

    return (
        <motion.div className={"header"}>
            <motion.div className={"calendar-div"}
                        onTap={() => setCalendarVisible(!calendarVisible)}
                        whileTap={{
                            scale: 0.9
                        }}
            >
                <img src={calendarIMG} alt={""}/>
            </motion.div>

            <div className={"current-day"}>
                {dayjs(calendarValue).format('DD.MM')}
            </div>

            <motion.div className={"restore"}
                        onTap={() => restore()}
                        whileTap={{
                            scale: 0.9
                        }}
            >
                <img src={restoreIMG} alt={""}/>
            </motion.div>
        </motion.div>
    );
};

export default TrainingPageHeader;