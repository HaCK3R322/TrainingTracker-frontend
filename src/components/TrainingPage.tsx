import React, {CSSProperties} from 'react';
import Header from "./Header";

import './../css/app.css'
import styled from "styled-components";
import Exercise from "../api/entities/Exercise";
import {useLoaderData, useParams} from "react-router-dom";

import {motion} from "framer-motion";
import {fetchGetAllExercisesByTrainingId} from "../api/Exercises";
import training from "../api/entities/Training";


const TrainingPage = () => {
    let {trainingId} = useParams();

    return (
        <motion.div
            initial={{x: window.innerWidth}}
            animate={{x: 0}}
            exit={{x: window.innerWidth}}
            transition={{ duration: 0.5}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: 390 + 'px',
                height: 844 + 'px'
            }}
                 key="TrainingPage-Wrapper"
            >
                <Header key={'TrainingPage-header'}/>

                <div style={someDivStyle}>
                    aksdoasnfdijadnia
                </div>
            </div>
        </motion.div>
    );
};

const someDivStyle: CSSProperties = {
    fontSize: '20px',
    position: 'absolute',
    top: '200px',
    backgroundColor: 'gray'
}

export default TrainingPage;