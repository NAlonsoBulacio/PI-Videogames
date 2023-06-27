import { Link } from "react-router-dom";
import style from "./Landing.module.css"

const Landing = () => {

    return(
        <div className={style.landing}>
        <button> 
          <Link to='/home'> Bienvenido a mi Aplicacion sobre Videojuegos! </Link>
        </button>
        </div>
    )
}

export default Landing;