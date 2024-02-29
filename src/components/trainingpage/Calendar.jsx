import React from 'react';
import {motion} from "framer-motion";
import {createTheme, ThemeProvider} from "@mui/material";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Calendar = ({exercises, dateCalendarValue, setDateCalendarValue, isVisible, setVisible}) => {
    const calendarTheme = createTheme({
        typography: {
            fontFamily: `'Questrial', sans-serif`,
            color: "var(--second-color)"
        }
    })

    const wasMentioned = (day) => {
        for (const exercise of exercises) {
            const exerciseTimestamp = exercise.timestamp;

            // Assuming exerciseTimestamp is a number representing the timestamp
            const exerciseDay = dayjs(exerciseTimestamp);

            // Compare day with exercise timestamp using dayjs methods
            if (day.isSame(exerciseDay, 'day')) {
                return true;
            }
        }

        return false;
    };

    return (
        <div>
            <motion.div
                animate={isVisible
                    ? {top: "0"} :
                    {top: "-300px"}
                }

                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }}
            >
                <div style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    backgroundColor: "black",
                    width: "100%",
                    height: "300px"
                }}>
                    <ThemeProvider theme={calendarTheme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                            <DateCalendar
                                sx={{
                                    color: "var(--second-color)",
                                    '& button': { color: 'var(--second-color)' },
                                    '& span': { color: 'var(--second-color)' },
                                }}
                                value={dateCalendarValue}
                                onChange={(newDateCalendarValue) => {
                                    setDateCalendarValue(newDateCalendarValue);
                                }}
                                slotProps={{
                                    day: (date, dateRangeProps) => {
                                        const isGreen = wasMentioned(date.day);
                                        const dayProps = dateRangeProps?.getDayProps({ date, ...dateRangeProps }) || {};

                                        return {
                                            ...dayProps,
                                            style: {
                                                ...(dayProps.style || {}),
                                                color: isGreen ? 'var(--button-color)' : undefined,
                                            },
                                            sx: {
                                                "&.MuiPickersDay-root.Mui-selected": {
                                                    outline: "1px solid var(--blue-color)",
                                                    backgroundColor: "black"
                                                },
                                            }
                                        };
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </motion.div>

            {isVisible &&
                <motion.div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "300px",
                        left: 0,
                        zIndex: 100
                    }}
                    onTap={() => {setVisible(false)}}
                />
            }
        </div>
    );
};

export default Calendar;