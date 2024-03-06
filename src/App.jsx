import MainPage from "./components/mainpage/MainPage";
import TrainingPage from "./components/trainingpage/TrainingPage";
import {AnimatePresence} from "framer-motion";
import {Route, Routes, useLocation} from "react-router-dom";
import {useState} from "react";
import LoginPage from "./components/LoginPage";

function App() {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("JWT") !== null);

    return (
        <div>
            {
                loggedIn ?
                    <AnimatePresence mode={"sync"} initial={false}>
                        <Routes location={location} key={location.pathname}>
                            <Route path={"/*"} element={<MainPage />} />
                            <Route path={"/training/:trainingId"} element={<TrainingPage/>}/>
                        </Routes>
                    </AnimatePresence> :
                    <LoginPage setLoggedIn={setLoggedIn}/>
            }`
        </div>
    );
}

export default App;
