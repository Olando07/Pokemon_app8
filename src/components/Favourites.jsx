import React from 'react';
import "../index.css";
import PokemonCard from './PokemonCard';

function Favourites({ collection }) {

    return (
        <div className="favourites">
            <div className="overlay">
                {collection.map((pokemon) => {
                    return (
                    <PokemonCard
                        key={pokemon.id}
                        name={pokemon.name}
                        types={pokemon.types}
                        picture={pokemon.picture}
                    />)
                })}
            </div>
        </div>
    );
}

export default Favourites;
