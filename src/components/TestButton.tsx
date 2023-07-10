import React from 'react';
import fetchCreateTraining from "../api/Trainings";

function createTraining(): void {
    fetchCreateTraining("Test name")
        .then(training => {
            console.log('Training created:')
            console.log(training)
        })
        .catch(error => {
            if(error instanceof Error) {
                alert(error.message)
            }
        })
}

const TestButton = () => {
    return (
        <div>
            <button onClick={createTraining}>
                Click me!
            </button>
        </div>
    );
};

export default TestButton;