import React from 'react';
import "../index.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="home">
            <div>
                <h1>Welcome to the pokemon guessing game.</h1> <h1>Click play to begin the game</h1>
                <Link to="/Pokemon_app/guessing-game">
                    <button>Play</button>
                </Link>
            </div>
        </section>
    );
}

export default Home;
