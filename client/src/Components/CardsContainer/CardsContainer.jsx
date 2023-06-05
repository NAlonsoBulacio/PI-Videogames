import Card from "../Card/Card"
import style from "./CardsContainer.module.css"


 const CardsContainer = ({ users }) => {


    return(
        <div className={style.container}>
            {users?.map((user) => <Card
            key = {user.id}
            id = {user.id}
            Nombre = {user.Nombre}
            Rating = {user.Rating}
            Fecha_de_lanzamiento = {user.Fecha_de_lanzamiento}
            Imagen = {user.Imagen}
            Plataformas = {user.Plataformas}
            Generos = {user.Generos}
            />)}
        </div>
    )
}

export default CardsContainer;