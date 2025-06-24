import React from 'react';
import "../index.css";

function PokemonCard({picture, name, types}) {
    return (
        <div className="pokemon-card">
            <img src={picture} alt={name} />
            <h3>{name}</h3>
            <p>Types: {types.join(", ")}</p>
        </div>
    );
}

export default PokemonCard;
