import React, {useState} from 'react';
import '../../style/trainingpage/trainingpage.css'
import ExerciseCard from "./ExerciseCard";
import '../../style/motion-framer-wrapper.css'
import {motion} from "framer-motion";

const ExerciseCardsSwiper = ({cardsData}) => {
    const cardStates = {
        CENTRAL: 'CENTRAL',
        MOST_LEFT: 'MOST_LEFT',
        MOST_RIGHT: 'MOST_RIGHT',

        LEFTER_THAN_VISIBLE: 'LEFTER_THAN_VISIBLE',
        LEFTER_THAN_CHOSEN: 'LEFTER_THAN_CHOSEN',
        SECOND: 'SECOND',

        RIGHTER_THAN_VISIBLE: 'RIGHTER_THAN_VISIBLE',
        RIGHTER_THAN_CHOSEN: "RIGHTER_THAN_CHOSEN",
        PENULTIMATE: 'PENULTIMATE'
    }

    function calculateCardStateByItsPositionInArray(arraySize, currentChosenCardIndex, thisCardIndex) {
        // let lastCardIndex = arraySize - 1;
        // if(arraySize < 2) {
        //     return cardStates.CENTRAL;
        // } else if(currentChosenCardIndex === thisCardIndex) {
        //     if(thisCardIndex === 0) return cardStates.MOST_LEFT;
        //     if(thisCardIndex === lastCardIndex) return cardStates.MOST_RIGHT;
        //     return cardStates.CENTRAL;
        // } else if(thisCardIndex < currentChosenCardIndex) {
        //     if(lastCardIndex - thisCardIndex === 1) return cardStates.PENULTIMATE;
        //     return cardStates.LEFTER_THAN_CHOSEN;
        // } else if(thisCardIndex > currentChosenCardIndex) {
        //     if(thisCardIndex === 2) return cardStates.SECOND;
        //     return cardStates.RIGHTER_THAN_CHOSEN;
        // }`

        if(currentChosenCardIndex === thisCardIndex) {
            return cardStates.CENTRAL;
        } else if(currentChosenCardIndex < thisCardIndex) {
            if(thisCardIndex - currentChosenCardIndex > 1) return cardStates.RIGHTER_THAN_VISIBLE;
            return cardStates.RIGHTER_THAN_CHOSEN;
        } else {
            if(currentChosenCardIndex - thisCardIndex > 1) return cardStates.LEFTER_THAN_VISIBLE;
            return cardStates.LEFTER_THAN_CHOSEN;
        }
    }

    const [cards, setCards] = useState(cardsData);
    const [currentChosenCardIndex, setCurrentChosenCardIndex] = useState(0);

    const swipedLeftCallback = () => {
        if(currentChosenCardIndex < cards.length - 1) setCurrentChosenCardIndex(currentChosenCardIndex + 1);
    }
    const swipedRightCallback = () => {
        if(currentChosenCardIndex > 0) setCurrentChosenCardIndex(currentChosenCardIndex - 1);
    }

    return(
        <div>
            {cards.map((card, index) =>
                <ExerciseCard
                    name={card.name}
                    units={card.units}
                    sets={card.sets}
                    swipeState={calculateCardStateByItsPositionInArray(cards.length, currentChosenCardIndex, index)}
                    key={card.name}
                    swipedLeftCallback={swipedLeftCallback}
                    swipedRightCallback={swipedRightCallback}
                />
            )}
        </div>
    )
}

const TrainingPage = () => {
    return (
        <motion.div
            initial={{x: "99%"}}
            animate={{x: "0%"}}
            exit={{x: "99%"}}
            transition={{duration: 0.3}}

            key={'TrainingPage-content'}

            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height:  "100%"
            }}
        >
            <div className={"motion-framer-wrapper"}   key="TrainingPage-Wrapper">
                <div className={"training-tracker-theme"}>
                    <div className={"background-div"}>
                        <div className={"header"} />

                        <div className={"scroller-div"}>
                            <ExerciseCardsSwiper cardsData={[
                                {name: "1",
                                    units: "kg",
                                    sets: [{amount: 80, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}]
                                },
                                {name: "2",
                                    units: "kg",
                                    sets: [{amount: 80, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}]
                                },
                                {name: "3",
                                    units: "kg",
                                    sets: [{amount: 80, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}]
                                },
                                {name: "4",
                                    units: "kg",
                                    sets: [{amount: 94, reps: 12}, {amount: 94, reps: 10}, {amount: 94, reps: 8}]
                                },
                                {name: "5",
                                    units: "kg",
                                    sets: [{amount: 250, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}]
                                }
                            ]}/>
                        </div>

                        <div className={"tipa-keyboard"}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;