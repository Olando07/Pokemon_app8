import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Favourites from "./components/Favourites";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {    
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/Pokemon_app8/" element={<Home></Home>}></Route>
                <Route path="/Pokemon_app8/guessing-game" element={<Game></Game>}></Route>
                <Route path="/Pokemon_app8/favourites" element={<Favourites></Favourites>}></Route>
            </Routes>
        </>
    );
}

export default App;
