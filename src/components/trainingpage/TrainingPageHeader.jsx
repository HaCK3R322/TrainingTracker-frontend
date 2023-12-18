import React, {useState} from 'react';
import '../../style/trainingpage/trainingpageheader.css'

const TrainingPageHeader = () => {
    const [prevDayExists, setPrevDayExists] = useState(true);
    const [nextDayExists, setNextDayExists] = useState(true);

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
        </div>
    );
};

export default TrainingPageHeader;