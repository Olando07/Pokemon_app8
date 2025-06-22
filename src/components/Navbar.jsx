import "../index.css";
import pikachu from "../assets/pikachu3.png";
import home from "../assets/lucario.png";
import star from "../assets/pikachu_icon2.png";

function Navbar() {
    return (
        <section className="navbar">
            <nav>
                <div className="navbar-heading">
                    <h1>Pokemon Guessing Game</h1>
                    <img src={pikachu} alt="pikachu" />
                </div>
                <div className="nav-buttons">
                    <button className="home-btn">
                        <img src={home} alt="" id="home" />
                        <p>Home</p>
                    </button>
                    <button className="favourites-btn">
                        <img src={star} alt="" id="favourite" />
                        <p>Your Collection</p>
                    </button>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
