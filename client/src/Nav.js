import './App.css';
import {Link} from "react-router-dom"

function Nav() {
    const navStyle = {
        color: "white",
    }

  return (
    <nav>
        <h3>SLiM Web</h3>
        <ul className="nav-links">
            <Link to="/neutralsim" style={navStyle}>
                <li>Neutral Simulation</li>
            </Link>
            <Link to="/about" style={navStyle}>
                <li>About</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
