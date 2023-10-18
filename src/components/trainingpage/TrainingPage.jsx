import React from 'react';
import '../../style/trainingpage/trainingpage.css'
import ExerciseCard from "./ExerciseCard";
import Swiper from "swiper";
import {motion} from "framer-motion";


const TrainingPage = () => {
    return (
        <motion.div
            initial={{x: 1}}
            animate={{x: 0}}
            exit={{x: 1}}
            transition={{ duration: 0.3}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <div style={{
                position: 'relative',
                width: 100 + '%',
                height: 100 + '%',
            }}
                 key="TrainingPage-Wrapper"
                 id={"TrainingPage-Wrapper"}
            >
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>
                        <div className={"header"} />

                        <div className={"scroller-div"}>
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    {/* <div className={"swiper-slide"}>*/}
                                    {/*     <ExerciseCard*/}
                                    {/*         name={"leg press"}*/}
                                    {/*         units={"kg"}*/}
                                    {/*         sets={[*/}
                                    {/*             {amount: 250, reps: 12},*/}
                                    {/*             {amount: 250, reps: 12},*/}
                                    {/*             {amount: 250, reps: 12}*/}
                                    {/*         ]}*/}
                                    {/*     />*/}
                                    {/* </div>*/}

                                    {/* <div className={"swiper-slide"}>*/}
                                    {/*     <ExerciseCard*/}
                                    {/*         name={"leg extension"}*/}
                                    {/*         units={"kg"}*/}
                                    {/*         sets={[*/}
                                    {/*             {amount: 80, reps: 12},*/}
                                    {/*             {amount: 80, reps: 12},*/}
                                    {/*             {amount: 80, reps: 12}*/}
                                    {/*         ]}*/}
                                    {/*     />*/}
                                    {/* </div>*/}

                                    {/*<div className={"swiper-slide"}>*/}
                                    {/*    <ExerciseCard*/}
                                    {/*        name={"adductor"}*/}
                                    {/*        units={"kg"}*/}
                                    {/*        sets={[*/}
                                    {/*            {amount: 80, reps: 13},*/}
                                    {/*            {amount: 80, reps: 13},*/}
                                    {/*            {amount: 80, reps: 13}*/}
                                    {/*        ]}*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className={"swiper-slide"}>hello</div>
                                    <div className={"swiper-slide"}>hello</div>
                                    <div className={"swiper-slide"}>hello</div>
                                </div>
                                <div className="swiper-pagination"></div>

                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>

                                <div className="swiper-scrollbar"></div>
                            </div>
                        </div>

                        <div className={"tipa-keyboard"}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;