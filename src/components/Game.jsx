import React, { useState, useEffect } from "react";
import "../index.css";
import pokemonNames from "../pokemonNames";

function Game() {
    const [currentPokemon, setCurrentPokemon] = useState();

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
            const newPokemon = {
                name: pokemon.name,
                id: pokemon.id,
                types: pokemon.types.map((obj) => obj.type.name),
                picture: pokemon.sprites.front_default,
            };

            // console.log(newPokemon);
            setCurrentPokemon(newPokemon);

            if (!res.ok) {
                throw new Error(`Pokemon not found: ${pokemonName}`);
            }
        } catch (err) {
            console.log(`An error has occured. Error: ${err}`);
            return null;
        }
    }

    useEffect(() => {
        getPokemon();
    }, [])

    useEffect(() => {
        localStorage.setItem("current_Pokemon", JSON.stringify(currentPokemon));
    }, [currentPokemon]);

    return (
        <section className="game">
            <div>
                <img src={currentPokemon.picture} alt="" />  
            </div>
        </section>
    );
};

export default Game;
