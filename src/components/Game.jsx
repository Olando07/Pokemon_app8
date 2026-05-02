import React, { useState, useEffect, useRef } from "react";
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

	// New features to improve the game flow and UI
	const [isRevealed, setIsRevealed] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [pastGuesses, setPastGuesses] = useState([]);
	const inputRef = useRef(null);

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
			} else {
				setCurrentPokemon(newPokemon);
				setAttempts(0);
				setIsRevealed(false);
				setShowHint(false);
				setPastGuesses([]);
				setFeedback("");
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}
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
		if (!guess.trim() || isRevealed) return;

		const newAttempts = attempts + 1;
		setAttempts(newAttempts);
		setPastGuesses((prev) => [...prev, guess.toLowerCase()]);

		if (guess.toLowerCase() === currentPokemon.name.toLowerCase()) {
			setCollection((prev) => [...prev, currentPokemon]);
			setFeedback(`Congrats!!😌You caught ${currentPokemon.name}`);
			setIsRevealed(true);
			setTimeout(() => getPokemon(), 3000);
		} else if (newAttempts >= 3) {
			setFeedback(`NoOooOO!😔😓The pokemon was ${currentPokemon.name}`);
			setIsRevealed(true);
			setTimeout(() => getPokemon(), 3000);
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
				<div className="pokemon">
					{currentPokemon.picture && (
						<img
							src={currentPokemon.picture}
							alt="pokemon"
							onLoad={() => setImageLoaded(true)}
							style={{
								filter: isRevealed ? "brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.7))" : "brightness(0)",
								transition: "filter 0.5s ease-in-out",
								visibility: imageLoaded ? "visible" : "hidden",
							}}
						/>
					)}
				</div>
				<h1>Guess!!! Who’s that pokemon?</h1>
				<div className="wordle-container">
					{currentPokemon.name &&
						currentPokemon.name.split("").map((char, index) => {
							const isRevealedChar = isRevealed || pastGuesses.some((g) => g[index] === char.toLowerCase() || g.includes(char.toLowerCase()));
							return (
								<div key={index} className={`wordle-char ${isRevealedChar ? "revealed" : ""}`}>
									{isRevealedChar ? char : ""}
								</div>
							);
						})}
				</div>
				<div className="user-guess">
					<div className="input-wrapper">
						<label htmlFor="guess">Your Guess:</label>
						<input id="guess" ref={inputRef} value={guess} disabled={isRevealed} onChange={(e) => setGuess(e.target.value)} onKeyUp={(e) => e.key === "Enter" && checkPokemon()} type="text" placeholder="Enter a Pokemon name" />
					</div>
					<div className="button-group">
						<button onClick={handleClick} disabled={isRevealed}>
							Guess
						</button>
						<button onClick={() => setShowHint(true)} disabled={isRevealed || showHint} className="hint-btn">
							Hint
						</button>
					</div>
				</div>
				{showHint && currentPokemon.types && (
					<p className="hint-text">
						Hint: It's a <strong>{currentPokemon.types.join(" / ")}</strong> type. Starts with <strong>'{currentPokemon.name.charAt(0).toUpperCase()}'</strong>!
					</p>
				)}
				{feedback && <p className="feedback-anim">{feedback}</p>}
				<p>Attempts: {attempts} out of 3</p>
			</div>
		</section>
	);
}

export default Game;
