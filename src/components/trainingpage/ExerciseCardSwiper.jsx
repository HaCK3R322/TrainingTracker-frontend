import React, {useContext, useEffect, useState} from "react";
import ExerciseCard from "./ExerciseCard";
import {ExerciseCardsSwiperPagination} from "./ExerciseCardSwiperPagination";
import SwipeStates from "./SwipeStates.json"
import NewCardForm from "./NewCardForm";
import {ExercisesContext} from "./contexts/ExercisesContext";
import {CalendarContext} from "./contexts/CalendarContext";
import dayjs from "dayjs";


const ExerciseCardsSwiper = () => {
    const exercisesContext = useContext(ExercisesContext)
    const calendarContext = useContext(CalendarContext)

    const [exercises, setExercises] = [exercisesContext.exercises, exercisesContext.setExercises]
    const calendarValue = calendarContext.dateValue

    const [cards, setCards] = useState([])
    const [currentChosenCardIndex, setCurrentChosenCardIndex] = useState(0);
    const [cardLimitNotExceed, setCardLimitNotExceed] = useState(false);

    useEffect(() => {
        const cards = exercises.filter(e => e.timestamp.isSame(calendarValue, 'day'))
        console.log("Updated cards:", cards)
        setCards(cards)
    }, [calendarValue, exercises]);

    useEffect(() => {
        setCardLimitNotExceed(cards.length < 10);
    }, [cards]);

    useEffect(() => {
        setCurrentChosenCardIndex(0);
    }, [calendarValue]);

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

            exercisesContext.swapTimestamps(chosenCard, nextCard)

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

            exercisesContext.swapTimestamps(chosenCard, prevCard)

            let newCardsArray = [...cards];
            newCardsArray[currentChosenCardIndex - 1] = chosenCard;
            newCardsArray[currentChosenCardIndex] = prevCard;
            setCards(newCardsArray);
            setCurrentChosenCardIndex(currentChosenCardIndex - 1);
        }
    }

    const deleteCallback = () => {
        let exerciseToDelete = cards[currentChosenCardIndex]
        exercisesContext.deleteExercise(exerciseToDelete)

        setCards(cards.filter(card =>
            card.id !== exerciseToDelete.id
        ))

        let nextIndex = currentChosenCardIndex === cards.length - 1 ?
            currentChosenCardIndex === 0 ? currentChosenCardIndex : currentChosenCardIndex - 1 :
            currentChosenCardIndex

        setCurrentChosenCardIndex(nextIndex)
    }

    return(
        <div>
            {cards
                .sort((a, b) => a.timestamp.diff(b.timestamp))
                .map((card, index) =>
                    <ExerciseCard
                        swipeState={calculateSwipeStateByCardPosition(cards.length, currentChosenCardIndex, index)}
                        key={card.id}

                        swipedLeftCallback={swipedLeftCallback}
                        swipedRightCallback={swipedRightCallback}

                        swapToRightCallback={swapRightCallback}
                        swapToLeftCallback={swapLeftCallback}

                        selfDeleteCallback={deleteCallback}

                        exercise={card}
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