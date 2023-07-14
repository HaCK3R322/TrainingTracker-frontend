import React, {CSSProperties} from 'react';
import Header from "./Header";

import './../css/app.css'
import styled from "styled-components";
import Exercise from "../api/entities/Exercise";
import {useLoaderData} from "react-router-dom";

const Somediv = styled.div`
  font-size: xx-large;
  position: absolute;
  top: 500px;
`

const TrainingPage = () => {
    const exercises: Exercise[] = useLoaderData() as Exercise[]

    return (
        <div>
            <Header/>
            <div style={someDivStyle}>
                {exercises.map(exercise => (
                    exercise.name
                ))}
            </div>
        </div>
    );
};

const someDivStyle: CSSProperties = {
    fontSize: '20px',
    position: 'absolute',
    top: '200px',
    backgroundColor: 'red'
}

export default TrainingPage;