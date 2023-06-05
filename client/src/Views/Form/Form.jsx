import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { useHistory } from "react-router-dom";


const Form = () => {
   
    const dispatch = useDispatch();
    const generos = useSelector(state => state.generos);
    const history = useHistory();

    const [form, setForm] = useState({
        Nombre:"",
        Imagen: "",
        Descripción:"",
        Plataformas:"",
        Fecha_de_lanzamiento:'',
        Rating:0,
        Generos:[],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getGenres());
        }, [dispatch])
    
    const changeHandler = (event) => {
    const inputChange = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [inputChange]: value });
    validate({ ...form, [inputChange]: value });
    };


    
    const checkHandler = (event) => {
        const { checked, value } = event.target;
        let nuevoGenero 
        if(checked){
            nuevoGenero = [...form.Generos, value]
        }else{
            nuevoGenero = form.Generos.filter((genero) => genero !== value)
        }
        setForm({ ...form, Generos: nuevoGenero });
        validate({ ...form, Generos: nuevoGenero });
    }

    const validate = (form) => {
        let errors = {};
        if(!form.Nombre){
            errors.Nombre = "Debe ponerle un nombre a su Videojuego!"
        };
        if(form.Nombre){
        const regexMayONum = /^[A-Z0-9]/
        if(!regexMayONum.test(form.Nombre.charAt(0))){
            errors.Nombre = "El primer caracter debe ser mayuscula o un Numero."
        }};
        if(!form.Imagen){
            errors.Imagen = "Debes ingresar url de tu Imagen."
        }
        if(!form.Descripción){
            errors.Descripción = "Debes describir tu Videojuego."
        }
        if(!form.Plataformas){
            errors.Plataformas = "Debes escribir en que plataformas esta tu Videojuego."
        }
        if(!form.Fecha_de_lanzamiento){
            errors.Fecha_de_lanzamiento = "Debes ingresar una fecha de lanzamiento."
        };

        if(!form.Rating){
            errors.Rating = "Debes ponerle un Rating a tu Videojuego."
        };
        if(form.Rating < 0 || form.Rating > 10){
            errors.Rating = "El Rating no puede ser menor a 0 o mayor a 10."
        };
        if(form.Generos.length === 0){
            errors.Generos = "Debes seleccionar uno o mas Generos."
        }
        setErrors(errors);
        };

    const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.preventDefault);
    axios.post("http://localhost:3001/videogames",form)
    .then(res => alert(res))
    .catch(err => alert(err))
    setForm({
        Nombre:"",
        Imagen: "",
        Descripción:"",
        Plataformas:"",
        Fecha_de_lanzamiento:'',
        Rating:0,
        Generos:[],
    })
    history.push('/home');
    };

    return(
        <form onSubmit={submitHandler}>
                    <h1>crea tu videojuego</h1>
            <div>
                <label> Nombre del Videojuego</label>
                <input type="text" name="Nombre" value={form.Nombre} onChange={changeHandler}/>
                {errors.Nombre && <span>{errors.Nombre}</span>}
            </div>
            <div>
                <label>Imagen de tu Videojuego</label>
                <input type="text" name="Imagen" value={form.Imagen} onChange={changeHandler}/>
                {errors.Imagen && <span>{errors.Imagen}</span>}
            </div>
            <div>
                <label>Descripcion de tu Videojuego</label>
                <input type="text" name="Descripción" value={form.Descripción} onChange={changeHandler}/>
                {errors.Descripción && <span>{errors.Descripción}</span>}
            </div>
            <div>
                <label>Plataformas del Videojuego</label>
                <input type="text" name="Plataformas" value={form.Plataformas} onChange={changeHandler}/>
                {errors.Plataformas && <span>{errors.Plataformas}</span>}
            </div>
            <div>
                <label>Fecha de lanzamiento</label>
                <input type="date" name="Fecha_de_lanzamiento" value={form.Fecha_de_lanzamiento} onChange={changeHandler}/>
                {errors.PlataformFecha_de_lanzamientoas && <span>{errors.Fecha_de_lanzamiento}</span>}
            </div>
            <div>
                <label>Rating</label>
                <input type="number" name="Rating" value={form.Rating} onChange={changeHandler}/>
                {errors.Rating && <span>{errors.Rating}</span>}
            </div>
            <div>
                <label> Generos </label>
                {generos?.map((genero) => <label key={genero.id}>
                    <input type="checkbox"
                    onChange={(event) => checkHandler(event)}
                    name={genero.Nombre}
                    value={genero.Nombre}
                     /> {genero.Nombre}
                </label>)}
                {errors.Generos && <span>{errors.Generos}</span>}
            </div>
            <button type="submit" disabled={Object.keys(errors).length > 0} >Crear Videojuego</button>
        </form>
    )
}

export default Form;