import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Game from "./components/Game";
import { Routes, Route } from "react-router-dom";

function App() {
    const [currentScreen, setCurrentScreen] = useState("home");
    
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/guessing-game" element={<Game/>}></Route>
            </Routes>

            {currentScreen === "home" && (
                <Home onHome={()=> setCurrentScreen("game")} />
            )}
            
            {currentScreen === "game" && (<Game />)}
            
        </>
    );
}

export default App;
