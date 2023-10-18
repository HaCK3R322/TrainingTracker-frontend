import React from 'react';

const ExerciseCard = ({name, units, sets}) => {
    return (
        <div>
            <div className={"exercise-card"}>
                <div className={"exercise-name-div"}>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;