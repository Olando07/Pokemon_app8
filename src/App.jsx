import React, {useState} from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import pokemonNames from "./pokemonNames";

function App() {
    const [currentPokemon, setCurrentPokemon] = useState('');

    // Get a single random Pokemon name
    const getRandomPokemon = () => {
        const randomIndex = Math.floor(Math.random() * pokemonNames.length);
        return pokemonNames[randomIndex];
    };

    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

    async function getPokemon() {
        try {
            let pokemonName = getRandomPokemon();
            let url = BASE_URL + pokemonName;
            let res = await fetch(url);
            let pokemon = await res.json();
            setCurrentPokemon(pokemon);

            if (!res.ok) {
                throw new Error(`Pokemon not found: ${pokemonName}`);
            }
        } catch (err) {
            console.log(`An error has occured. Error: ${err}`);
            return null;
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <section className="home">
                <div>
                    <h1>Welcome to the pokemon guessing game. Click play to begin the game</h1>
                    <button onClick={getPokemon}>Play</button>
                </div>
            </section>
        </>
    );
}

export default App;
