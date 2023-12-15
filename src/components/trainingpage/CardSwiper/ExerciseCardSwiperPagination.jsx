import React, {useEffect, useState} from "react";

const ExerciseCardsSwiperPagination = ({arrLength, chosenIndex, setChosenIndex}) => {
    const [dots, setDots] = useState([]);
    useEffect(() => {
        let newDots = []
        for(let i = 0; i <= arrLength; i++) {
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
                        opacity: dot.index === chosenIndex ? 1.0 : 0.5,
                        backgroundColor: dot.index < arrLength ? "var(--second-color)" : "var(--button-color)"
                    }}
                >
                </div>
            )}
        </div>
    )
}

export {ExerciseCardsSwiperPagination}