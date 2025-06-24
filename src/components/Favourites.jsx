import React from 'react';
import "../index.css";
import { useCollection } from "../context/CollectionContext";
import PokemonCard from './PokemonCard';

function Favourites() {
    const { collection } = useCollection();

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
                        />
                    )})}
            </div>
        </div>
    );
}

export default Favourites;
