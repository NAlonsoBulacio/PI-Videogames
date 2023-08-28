import style from "./Card.module.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return(
        <div className={style.card} key={props.id}>
            <Link to={`/detail/${props.id}`}>
               <img src={props.Imagen} alt="imagen del videojuego"/>
            </Link>
            <h3> {props.Nombre}</h3>
            <p>Generos: </p>
            {props.Generos?.map((genero) => <p
            key={genero}> {genero} </p>)}

        </div>
    )
};

export default Card;