import React from 'react';
import "../index.css";

function Home({onHome}) {
    return (
        <section className="home">
            <div>
                <h1>Welcome to the pokemon guessing game.</h1> <h1>Click play to begin the game</h1>
                <button onClick={onHome}>Play</button>
            </div>
        </section>
    );
}

export default Home;
