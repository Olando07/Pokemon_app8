import React, {useState} from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Favourites from "./components/Favourites";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
    const [collection, setCollection] = useState(localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection")) : []);
    

    
    return (
        <>
            <Navbar></Navbar>
            <BrowserRouter basename="/Pokemon_app8">
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/guessing-game" element={<Game collection={collection} setCollection={setCollection}></Game>}></Route>
                    <Route path="/favourites" element={<Favourites collection={collection}></Favourites>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
