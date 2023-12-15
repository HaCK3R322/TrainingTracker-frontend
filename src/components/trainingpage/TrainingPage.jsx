import {motion} from "framer-motion";
import {ExerciseCardsSwiper} from "./CardSwiper/ExerciseCardSwiper";
import '../../style/theme.css'
import '../../style/trainingpage/trainingpage.css'
import '../../style/motion-framer-wrapper.css'
import '../../style/trainingpage/exercisecard.css'
import '../../style/trainingpage/exercisecardsswiperpagination.css'


const cardsDataInitial = [
    {name: "1",
        units: "kg",
        sets: [{amount: 80, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12},{amount: 250, reps: 12}]
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
    },
    {name: "6",
        units: "kg",
        sets: [{amount: 250, reps: 12}, {amount: 250, reps: 12}, {amount: 250, reps: 12}]
    }
]

const TrainingPage = () => {
    return (
        <motion.div
            initial={{x: "100%"}}
            animate={{x: "0%"}}
            exit={{x: "100%"}}
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
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainingPage;