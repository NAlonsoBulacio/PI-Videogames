import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersId, getUsers, emptyDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";



const Detail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    const allUsers = useSelector(state => state.allUsers);
    const [mostrarDes, setMostrarDes] = useState(false);


    useEffect(() => {
        dispatch(getUsers());
        dispatch(getUsersId(id));
    }, [dispatch, id])

    useEffect(() => {
      return () => {
        dispatch(emptyDetail());
      }
    }, [])

    let videojuegosCoincidentes = [];
    let generosVideojuego = [];
    if (detail.length > 0) {
      generosVideojuego = detail[0].Generos;
      generosVideojuego.forEach((genero) => {
        const videojuegosGenero = allUsers.filter((user) =>
          user.Generos.includes(genero)
        );
        videojuegosCoincidentes = [
          ...videojuegosCoincidentes,
          ...videojuegosGenero,
        ];
      });
  
      videojuegosCoincidentes = Array.from(new Set(videojuegosCoincidentes));
      videojuegosCoincidentes = videojuegosCoincidentes.filter((video) => video.Nombre !== detail[0].Nombre)
    };

    const handleDescription = () => {
      setMostrarDes(!mostrarDes);
    };



    return(
<div className={style.detail}>
    {detail.length>0?
    <div>
        <h1>{detail[0].Nombre}</h1>
        <img src={detail[0].Imagen} alt={detail[0].Nombre} />
        <h4>Generos</h4>
        <ul>
            {generosVideojuego?.map((genero) => <li key={genero}>{genero}</li>)}
        </ul>
        <h4>Plataformas</h4>
        <ul>
          {detail[0].Plataformas?.map((plat) => <li key={plat}>{plat}</li>)}
        </ul>
        <button onClick={handleDescription} className={style.descripcion}>Descripción</button>
        {mostrarDes && <p>{detail[0].Descripción}</p>}
        <h4>Rating: {detail[0].Rating}</h4>
        <h4>Fecha de Lanzamiento: {detail[0].Fecha_de_lanzamiento.slice(0, 10)}</h4>
        <h4>ID:{detail[0].id}</h4>
        <div className={style.linkContainer}>
            <h4>Videojuegos similares</h4>
            {videojuegosCoincidentes.map((videojuego) => <Link to={`/detail/${videojuego.id}`} className={style.link} key={videojuego.id}>  {videojuego.Nombre}  </Link>)}
        </div>
    </div> : <p>loading</p>}
</div>
    );
}

export default Detail;