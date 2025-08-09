import React, { useState, useEffect } from "react";
import "../index.css";
import { useCollection } from "../context/CollectionContext";
import pokemonNames from "../pokemonNames";

function Game() {
    const { collection, setCollection } = useCollection();
    const [currentPokemon, setCurrentPokemon] = useState({});
    // User guess check and collection updation
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);

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

            if (!res.ok) {
                throw new Error(`Pokemon not found: ${pokemonName}`);
            }

            let pokemon = await res.json();
            if (!pokemon || !pokemon.name || !pokemon.id || !pokemon.types || !pokemon.sprites || !pokemon.sprites.front_default) {
				return getPokemon();
			}

            const newPokemon = {
                name: pokemon.name,
                id: pokemon.id,
                types: pokemon.types.map((obj) => obj.type.name),
                picture: pokemon.sprites.front_default,
            };

            if (collection.some((pokemon) => pokemon.id === newPokemon.id) || !newPokemon.picture) {
                await getPokemon();
            }

            setCurrentPokemon(newPokemon);
            setAttempts(0);
        } catch (err) {
            console.log(`An error has occured. Error: ${err}`);
            return null;
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);

    useEffect(() => {
        localStorage.setItem("current_Pokemon", JSON.stringify(currentPokemon));
    }, [currentPokemon]);

    const checkPokemon = () => {
        if (!guess.trim()) return;

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (guess.toLowerCase() === currentPokemon.name.toLowerCase()) {
            setCollection((prev) => [...prev, currentPokemon]);
            setFeedback(`Congrats!!😌You caught ${currentPokemon.name}`);
            getPokemon();
        } else if (newAttempts >= 3) {
            setFeedback(`NoOooOO!😔😓The pokemon was ${currentPokemon.name}`);
            getPokemon();
        } else {
            const remaining = 3 - newAttempts;
            setFeedback(`Wrong!!!💀 ${remaining} attempt${remaining > 1 ? "s" : ""} are left`);
        }

        setGuess("");
    };

    const handleClick = () => {
        checkPokemon();
    };

    useEffect(() => {
		setImageLoaded(false);
    }, [currentPokemon]);
    
    return (
		<section className="game">
			<div className="overlay">
				<div className="pokemon">{currentPokemon.picture && <img src={currentPokemon.picture} onLoad={() => setImageLoaded(true)} />}</div>
				<h1>Guess!!! Who’s that pokemon?</h1>
				<div className="user-guess">
					<label htmlFor="guess">Your Guess:</label>
					<input id="guess" value={guess} onChange={(e) => setGuess(e.target.value)} onKeyUp={(e) => e.key === "Enter" && checkPokemon()} type="text" placeholder="Enter a Pokemon name" />
					<button onClick={handleClick}>Guess</button>
				</div>
				{feedback && <p>{feedback}</p>}
				<p>Attempts: {attempts} out of 3</p>
			</div>
		</section>
	);
}

export default Game;
