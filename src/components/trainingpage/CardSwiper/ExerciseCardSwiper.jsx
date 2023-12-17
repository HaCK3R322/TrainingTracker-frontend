import React, {useEffect, useState} from "react";
import ExerciseCard from "./ExerciseCard";
import {ExerciseCardsSwiperPagination} from "./ExerciseCardSwiperPagination";
import SwipeStates from "./SwipeStates.json"
import NewCardForm from "./NewCardForm";

const ExerciseCardsSwiper = ({cardsData}) => {
    const [cards, setCards] = useState(cardsData);
    const [currentChosenCardIndex, setCurrentChosenCardIndex] = useState(0);
    const [cardLimitNotExceed, setCardLimitNotExceed] = useState(cards.length < 10);
    useEffect(() => {
        setCardLimitNotExceed(cards.length < 10);
    }, [cards]);

    const swipedLeftCallback = () => {
        if(currentChosenCardIndex < cards.length) {
            if(cardLimitNotExceed || (currentChosenCardIndex !== cards.length - 1)) {
                setCurrentChosenCardIndex(currentChosenCardIndex + 1);
            }
        }
    }
    const swipedRightCallback = () => {
        if(currentChosenCardIndex > 0) setCurrentChosenCardIndex(currentChosenCardIndex - 1);
    }

    const swapRightCallback = () => {
        if(currentChosenCardIndex !== cards.length - 1) {
            let chosenCard = cards[currentChosenCardIndex];
            let nextCard = cards[currentChosenCardIndex + 1];

            let newCardsArray = [...cards];
            newCardsArray[currentChosenCardIndex + 1] = chosenCard;
            newCardsArray[currentChosenCardIndex] = nextCard;

            setCards(newCardsArray);

            setCurrentChosenCardIndex(currentChosenCardIndex + 1);
        }
    }

    const swapLeftCallback = () => {
        if(currentChosenCardIndex !== 0) {
            let chosenCard = cards[currentChosenCardIndex];
            let prevCard = cards[currentChosenCardIndex - 1];

            let newCardsArray = [...cards];
            newCardsArray[currentChosenCardIndex - 1] = chosenCard;
            newCardsArray[currentChosenCardIndex] = prevCard;

            setCards(newCardsArray);

            setCurrentChosenCardIndex(currentChosenCardIndex - 1);
        }
    }

    const deleteCallback = () => {
        let newCards = [...cards];
        newCards.splice(currentChosenCardIndex, 1);

        setCards(newCards);

        let nextIndex = currentChosenCardIndex === cards.length - 1 ?
            currentChosenCardIndex === 0 ? currentChosenCardIndex : currentChosenCardIndex - 1 :
            currentChosenCardIndex

        setCurrentChosenCardIndex(nextIndex)
    }

    return(
        <div>
            {cards.map((card, index) =>
                <ExerciseCard
                    swipeState={calculateSwipeStateByCardPosition(cards.length, currentChosenCardIndex, index)}
                    key={card.id}
                    swipedLeftCallback={swipedLeftCallback}
                    swipedRightCallback={swipedRightCallback}

                    swapToRightCallback={swapRightCallback}
                    swapToLeftCallback={swapLeftCallback}

                    selfDeleteCallback={deleteCallback}

                    name={card.name}
                    units={card.units}
                    sets={card.sets}

                    setSets={(newSets) => {
                        let newCards = [...cards];
                        newCards[index].sets = newSets;
                        setCards(newCards);
                    }}
                />
            )}

            <ExerciseCardsSwiperPagination
                arrLength={cards.length}
                chosenIndex={currentChosenCardIndex}
                setChosenIndex={setCurrentChosenCardIndex}
                cards={cards}
            />

            {cardLimitNotExceed &&
                <NewCardForm
                    swipeState={calculateSwipeStateByCardPosition(cards.length + 1, currentChosenCardIndex, cards.length)}
                    key={"new-form"}
                    swipedLeftCallback={swipedLeftCallback}
                    swipedRightCallback={swipedRightCallback}

                    cards={cards}
                    setCards={setCards}
                />
            }
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