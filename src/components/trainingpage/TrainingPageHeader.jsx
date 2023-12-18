import React, {useState} from 'react';
import '../../style/trainingpage/trainingpageheader.css'
import {motion} from "framer-motion";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const TrainingPageHeader = () => {
    const [prevDayExists, setPrevDayExists] = useState(true);
    const [nextDayExists, setNextDayExists] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);

    const [visibleCalendar, setVisibleCalendar] = useState(true);

    return (
        <div className={"training-tracker-theme"}>
            <div className={"header"}>

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
            </div>

            <motion.div
                animate={visibleCalendar ? {
                    width: "0%",
                    height: "0%"
                } : {
                    width: "400px",
                    height: "400px"
                }}

                style={{
                    position: "absolute",
                    border: "2px solid black",
                    borderRadius: "5px",
                    zIndex: 5,
                    backgroundColor: "var(--second-color)",
                    left: "10px",
                    top: "20px"
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar  />
                </LocalizationProvider>
            </motion.div>

            <button onClick={() => {setVisibleCalendar(!visibleCalendar)}} style={{
                width: "100px",
                height: "50px",
                backgroundColor: "red",
                top: "500px",
                position: "absolute",
                zIndex: 5
            }}/>
        </div>
    );
};

export default TrainingPageHeader;