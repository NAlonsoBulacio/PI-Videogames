import { Link } from "react-router-dom";
import style from "./Landing.module.css"

const Landing = () => {

    return(
        <div className={style.landing}>
        <h1>este es el Landing</h1>
        <button> 
          <Link to='/home'> Home </Link>
        </button>
        </div>
    )
}

export default Landing;