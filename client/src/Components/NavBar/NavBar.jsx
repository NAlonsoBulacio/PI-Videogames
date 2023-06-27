import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
            <Link to="/home">
              <button className={style.button}> HOME </button>      
            </Link>
            <Link to="/create">
            <button className={style.button}> CREA TU VIDEOJUEGO! </button>    
            </Link>
        </div>
    )
}

export default NavBar;