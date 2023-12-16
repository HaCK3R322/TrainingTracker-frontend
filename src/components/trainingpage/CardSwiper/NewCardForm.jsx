import React, {useEffect, useState} from 'react';
import '../../../style/trainingpage/newcardform.css'
import SwipeStates from "./SwipeStates.json";
import {motion} from "framer-motion";
import okaymark from '../../../images/okaymark.png'

const NewCardForm = ({
                         swipedRightCallback,
                         swipedLeftCallback,
                         swipeState,

                         cards,
                         setCards
                     }) => {
    const [swipedRight, setSwipedRight] = useState(false);
    const [swipedLeft, setSwipedLeft] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(0);
    const [animateState, setAnimateState] = useState({zIndex: 3});

    const [cardLimitNotExceed, setCardLimitNotExceed] = useState(cards.length < 10 ? true : false);
    useEffect(() => {
        if(cards.length < 10) {
            setCardLimitNotExceed(true);
        } else {
            setCardLimitNotExceed(false);
        }
    }, [cards]);


    const [name, setName] = useState("");
    const [nameAcceptable, setNameAcceptable] = useState(false);
    useEffect(() => {
        if(name !== "") {
            setNameAcceptable(true);
        } else {
            setNameAcceptable(false);
        }
    }, [name]);

    const [chosenUnit, setChosenUnit] = useState("kg");

    const [canSubmit, setCanSubmit] = useState(false);
    useEffect(() => {
        setCanSubmit(nameAcceptable && cardLimitNotExceed);
    }, [nameAcceptable, cardLimitNotExceed]);

    const handleSubmitCreateCard = () => {
        if(cards.length < 10) {
            let newCard = {
                name: name,
                units: chosenUnit,
                sets: []
            }

            let newCards = [...cards];
            newCards.push(newCard);

            setCards(newCards)
        } else {
            alert("Достигнут предел упражнений!");
        }
    }

    useEffect(() => {
        setAnimateState(getAnimationBasedOnSwipeState(swipeState));
    }, [swipeState]);

    const handleDragStart = (info) => {
        setDragStartPoint(info.point.x);
    }

    const handleOnDrag = (info) => {
        let dragEnd = info.point.x;
        let distance = dragEnd - dragStartPoint;

        if(distance > 100) { // --->
            setSwipedRight(true);
            setSwipedLeft(false);
        } else if (distance < -100) { // <---
            setSwipedLeft(true);
            setSwipedRight(false);
        } else { // <->
            setSwipedRight(false);
            setSwipedLeft(false);
        }
    }
    const handleDragEnd = (info) => {
        if(swipedLeft) {
            swipedLeftCallback();
        }
        if(swipedRight) {
            swipedRightCallback();
        }

        setSwipedRight(false);
        setSwipedLeft(false);
    }

    return (
        <motion.div className={"new-card-form"}
                    drag={"x"}
                    dragSnapToOrigin={true}

                    onDragStart={(event, info) => {handleDragStart(info)}}
                    onDrag={(event, info) => {handleOnDrag(info)}}
                    onDragEnd={(event, info) => {handleDragEnd(info)}}

                    transition={{duration: 0.1}}
                    animate={animateState}
        >
            <div className={"name"}>
                <input
                    placeholder={"name"}
                    onChange={(event) => setName(event.target.value.toLowerCase())}
                />
            </div>

            <div className={"units-choice-div"} >
                <div className={`kg option ${chosenUnit === "kg" ? "chosen-unit" : ""}`}
                    onClick={() => {setChosenUnit("kg")}}
                >
                    <p>kg</p>
                </div>

                <div className={`sec option ${chosenUnit === "sec" ? "chosen-unit" : ""}`}
                     onClick={() => {setChosenUnit("sec")}}
                >
                    <p>sec</p>
                </div>

                <div className={`min option ${chosenUnit === "min" ? "chosen-unit" : ""}`}
                     onClick={() => {setChosenUnit("min")}}
                >
                    <p>min</p>
                </div>
            </div>

            <div
                className={"create-button"}
            >
                <motion.button
                    style={{
                        opacity: canSubmit ? 1.0 : 0.5,
                    }}

                    whileTap={{
                        scale: canSubmit ? 0.9 : 1.0
                    }}

                    onClick={
                        canSubmit ? handleSubmitCreateCard : ()=>{}
                    }
                >
                    <img src={okaymark} />
                </motion.button>
            </div>
        </motion.div>
    );
};

function getAnimationBasedOnSwipeState(swipeState) {
    switch(swipeState) {
        case SwipeStates.CENTRAL:
            return {
                zIndex: 3,
                x: 0,
                opacity: 3
            };
        case SwipeStates.LEFTER_THAN_CHOSEN:
            return {
                scale: 0.87,
                x: "-100%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.LEFTER_THAN_VISIBLE:
            return{
                scale: 0.87,
                x: "-120%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.RIGHTER_THAN_CHOSEN:
            return {
                scale: 0.87,
                x: "+100%",
                opacity: 0.5,
                zIndex: 2
            };
        case SwipeStates.RIGHTER_THAN_VISIBLE:
            return{
                scale: 0.87,
                x: "+120%",
                opacity: 0.5,
                zIndex: 2
            };
        default:
            alert("Wrong card state : " + swipeState)
    }
}

export default NewCardForm;