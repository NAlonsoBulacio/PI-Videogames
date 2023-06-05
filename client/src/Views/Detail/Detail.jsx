import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersId } from "../../redux/actions";
import { useParams } from "react-router-dom";



const Detail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getUsersId(id))
        console.log(id);
        console.log(detail);
    }, [dispatch])
    return(
<div>
    {detail.length>0?
    <div>
        <h1>el</h1>
        <h1>{detail[0].Nombre}</h1>
        <img src={detail[0].Imagen} alt={detail[0].Nombre} />
        <ul>
            {detail[0].Generos?.map((genero) => <li key={genero}>{genero}</li>)}
        </ul>
        <p>{detail[0].Descripción}</p>
        <h4>{detail[0].Rating}</h4>
    </div> : <p>loading</p>}
</div>
    );
}

export default Detail;