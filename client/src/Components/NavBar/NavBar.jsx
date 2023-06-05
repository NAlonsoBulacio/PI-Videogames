import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home">
              <button> HOME </button>      
            </Link>
            <Link to="/create">
            <button> CREA TU VIDEOJUEGO! </button>    
            </Link>
        </div>
    )
}

export default NavBar;