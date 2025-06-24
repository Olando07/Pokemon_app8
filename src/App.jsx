import React, {useState, useEffect} from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Favourites from "./components/Favourites";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
    const [collection, setCollection] = useState(localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection")) : "");
    useEffect(() => {
            localStorage.setItem("collection", JSON.stringify(collection));
    }, [collection]);

    return (
        <>
            <Navbar></Navbar>
            <Routes basename="/Pokemon_app8">
                <Route path="Pokemon_app8/" element={<Home></Home>}></Route>
                <Route path="Pokemon_app8/guessing-game" element={<Game collection={collection} setCollection={setCollection}></Game>}></Route>
                <Route path="Pokemon_app8/favourites" element={<Favourites collection={collection}></Favourites>}></Route>
            </Routes>
        </>
    );
}

export default App;
