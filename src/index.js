import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Swiper from "swiper";
import {Route, Router, Routes} from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path={"/"} element={<App/>}/>
        </Routes>
    </Router>
);

