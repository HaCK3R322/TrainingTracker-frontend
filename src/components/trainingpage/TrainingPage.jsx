import React, {useEffect, useState} from 'react';
import '../../style/trainingpage/trainingpage.css'
import ExerciseCard from "./ExerciseCard";
import '../../style/motion-framer-wrapper.css'
import {motion} from "framer-motion";
import '../../style/trainingpage/exercisecard.css'
import '../../style/trainingpage/exercisecardsswiperpagination.css'

const ExerciseCardsSwiperPagination = ({arrLength, chosenIndex, setChosenIndex}) => {
    const [dots, setDots] = useState([]);
    useEffect(() => {
        let newDots = []
        for(let i = 0; i < arrLength; i++) {
            newDots.push({index: i});
        }
        setDots(newDots);
    }, [arrLength]);

    return(
        <div className={"exercise-cards-swiper-pagination"}>
            {dots.map((dot) =>
                <div
                    className={"dot"}
                    key={dot.index} onClick={() => {setChosenIndex(dot.index)}}
                    style={{
                        opacity: dot.index === chosenIndex ? 1.0 : 0.5
                    }}
                >
                    {dot.index}
                </div>
            )}
        </div>
    )
}

const ExerciseCardsSwiper = ({cardsData}) => {
    const cardStates = {
        CENTRAL: 'CENTRAL',

        LEFTER_THAN_VISIBLE: 'LEFTER_THAN_VISIBLE',
        LEFTER_THAN_CHOSEN: 'LEFTER_THAN_CHOSEN',

        RIGHTER_THAN_VISIBLE: 'RIGHTER_THAN_VISIBLE',
        RIGHTER_THAN_CHOSEN: "RIGHTER_THAN_CHOSEN",
    }

    function calculateCardStateByItsPositionInArray(arraySize, currentChosenCardIndex, thisCardIndex) {
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

            <ExerciseCardsSwiperPagination
                arrLength={cards.length}
                chosenIndex={currentChosenCardIndex}
                setChosenIndex={setCurrentChosenCardIndex}
            />
        </div>
    )
}

const cardsDataInitial = [
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
]

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
                            <ExerciseCardsSwiper cardsData={cardsDataInitial}/>
                        </div>

                        <div className={"tipa-keyboard"}/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;