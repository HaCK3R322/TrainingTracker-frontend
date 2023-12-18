import React, {useEffect, useState} from "react";
import {motion, useAnimationControls} from "framer-motion";

const ExerciseCardsSwiperPagination = ({arrLength, chosenIndex, setChosenIndex}) => {
    const [dots, setDots] = useState([]);
    useEffect(() => {
        let newDots = []
        for(let i = 0; i <= arrLength; i++) {
            newDots.push({index: i});
        }
        setDots(newDots);
        setPrevChosenIndex(chosenIndex)
    }, [arrLength]);

    const [prevChosenIndex, setPrevChosenIndex] = useState(0);

    const [leftStartDistance, setLeftStartDistance] = useState([5,5,5,5,5]); //px
    const [leftWidthFrames, setLeftWidthFrames] = useState([0,0,0,0]);
    const [leftOpacityFrames, setLeftOpacityFrames] = useState([0,0,0,0]);

    const [rightStartDistance, setRightStartDistance] = useState([185,185,185,185,185]);
    const [rightWidthFrames, setRightWidthFrames] = useState([0,0,0,0]);
    const [rightOpacityFrames, setRightOpacityFrames] = useState([0,0,0,0]);

    const leftAnimationControls = useAnimationControls();
    const rightAnimationControls = useAnimationControls();

    useEffect(() => {
        let width = 20; //px

        let dotDistance = chosenIndex - prevChosenIndex;
        let newWidth = width + Math.abs(dotDistance) * 30; //px
        let opacityGrow = [1, 1, 0, 0, 0]

        let widthGrow = [`${width}px`, `${newWidth}px`, `${newWidth}px`, `${newWidth}px`, `0px`];
        let opacityShrink = [0, 0, 1, 1, 0]

        let widthShrink = [`${newWidth}px`, `${newWidth}px`,`${newWidth}px`, `${width}px`, `0px`];

        setLeftWidthFrames(dotDistance > 0 ? widthGrow : widthShrink);
        setRightWidthFrames(dotDistance > 0 ? widthShrink : widthGrow);

        setLeftOpacityFrames(dotDistance > 0 ? opacityGrow : opacityShrink);
        setRightOpacityFrames(dotDistance > 0 ? opacityShrink : opacityGrow);

        let a = `${prevChosenIndex * 30 + 5}px`;
        let b = `${chosenIndex * 30 + 5}px`;
        let c = `${arrLength * 30 + 5 - chosenIndex * 30}px`
        let d = `${arrLength * 30 + 5 - prevChosenIndex * 30}px`

        setLeftStartDistance(dotDistance > 0 ?
            [a,a,a,a,a] :
            [b,b,b,b,b]);
        setRightStartDistance(dotDistance > 0 ?
            [c,c,c,c,c] :
            [d,d,d,d,d]);

        setPrevChosenIndex(chosenIndex);
    }, [chosenIndex]);


    useEffect(() => {
        leftAnimationControls.start({
            width: leftWidthFrames,
            opacity: leftOpacityFrames,
            left: leftStartDistance
        });

        rightAnimationControls.start({
            width: rightWidthFrames,
            opacity: rightOpacityFrames,
            right: rightStartDistance
        });
    }, [prevChosenIndex]);

    return(
        <div className={"exercise-cards-swiper-pagination"}
            style={{
                width: (arrLength + 1) * 30
            }}
        >
            {dots.map((dot, index) =>
                <motion.div
                    className={"dot-hitbox"}
                    onTap={index < 10 ? () => {setChosenIndex(dot.index)} : ()=>{}}
                    key={dot.index}
                >
                    <div
                        className={"dot"}

                        style={{
                            opacity: dot.index === chosenIndex ? 1.0 : 0.5,
                            backgroundColor: dot.index < arrLength ?
                                "var(--second-color)" :
                                arrLength === 10 ?
                                    "red" : "var(--button-color)"
                        }}
                    >
                    </div>
                </motion.div>
            )}

            {/* left-fixed positioned slider */}
            <motion.div
                className={"dot2"}

                animate={leftAnimationControls}
                transition={{
                    times: [0, 0.5, 0.5, 1, 1],
                    duration: 0.1,
                }}
            />

            {/* right-fixed positioned slider */}
            <motion.div
                className={"dot2"}

                animate={rightAnimationControls}
                transition={{
                    times: [0, 0.5, 0.5, 1, 1],
                    duration: 0.1,
                }}
            />
        </div>
    )
}

export {ExerciseCardsSwiperPagination}