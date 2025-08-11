import "../index.css";
import { Link } from "react-router-dom";
import pikachu from "../assets/pikachu3.png";
import home from "../assets/lucario.png";
import star from "../assets/pikachu_icon2.png";
import game from "../assets/greninja_clear.png";

function Navbar() {
    return (
        <section className="navbar">
            <nav>
                <div className="navbar-heading">
                    <h1>Pokemon Guessing Game</h1>
                    <img src={pikachu} alt="pikachu" />
                </div>
                <div className="nav-buttons">
                    <Link to="/Pokemon_app8/">
                        <button className="home-btn">
                            <img src={home} alt="" id="home" />
                            <p>Home</p>
                        </button>
                    </Link>
                    <Link to="/Pokemon_app8/guessing-game">
                        <button className="game-btn">
                            <img src={game} alt="" id="game" />
                            <p>Play</p>
                        </button>
                    </Link>
                    <Link to="/Pokemon_app8/favourites">
                        <button className="favourites-btn">
                            <img src={star} alt="" id="favourite" />
                            <p>Your Collection</p>
                        </button>
                    </Link>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
