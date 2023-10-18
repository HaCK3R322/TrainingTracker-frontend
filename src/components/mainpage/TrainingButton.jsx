import React from 'react';

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
            <button
                className={"training-button"}
                style={{top: calcTopValue()}}
                onClick={action}
            >
                {name.toUpperCase()}
            </button>
        </div>
    );
};

export default TrainingButton;