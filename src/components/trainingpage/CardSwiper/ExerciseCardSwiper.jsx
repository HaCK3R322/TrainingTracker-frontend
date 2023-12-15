import React, {useState} from "react";
import ExerciseCard from "./ExerciseCard";
import {ExerciseCardsSwiperPagination} from "./ExerciseCardSwiperPagination";
import SwipeStates from "./SwipeStates.json"

const ExerciseCardsSwiper = ({cardsData}) => {
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
                    swipeState={calculateSwipeStateByCardPosition(cards.length, currentChosenCardIndex, index)}
                    key={card.name}
                    swipedLeftCallback={swipedLeftCallback}
                    swipedRightCallback={swipedRightCallback}

                    name={card.name}
                    units={card.units}
                    sets={card.sets}
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

function calculateSwipeStateByCardPosition(arraySize, currentChosenCardIndex, thisCardIndex) {
    if(currentChosenCardIndex === thisCardIndex) {
        return SwipeStates.CENTRAL;
    } else if(currentChosenCardIndex < thisCardIndex) {
        if(thisCardIndex - currentChosenCardIndex > 1) return SwipeStates.RIGHTER_THAN_VISIBLE;
        return SwipeStates.RIGHTER_THAN_CHOSEN;
    } else {
        if(currentChosenCardIndex - thisCardIndex > 1) return SwipeStates.LEFTER_THAN_VISIBLE;
        return SwipeStates.LEFTER_THAN_CHOSEN
    }
}

export {ExerciseCardsSwiper}