import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import style from "./Form.module.css"

const Form = () => {
   
    const dispatch = useDispatch();
    const generos = useSelector(state => state.generos);
    const history = useHistory();

    const [form, setForm] = useState({
        Nombre:"",
        Imagen: "",
        Descripción:"",
        Plataformas:[],
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
        let nuevoArr
        if(checked){
            nuevoArr = [...form.Generos, value]
        }else{
            nuevoArr = form.Generos.filter((genero) => genero !== value)
        }
        setForm({ ...form, Generos: nuevoArr });
        validate({ ...form, Generos: nuevoArr });
    }
    const checkHandlerPlat = (event) => {
        const { checked, value } = event.target;
        let nuevoArr
        if(checked){
            nuevoArr = [...form.Plataformas, value]
        }else{
            nuevoArr = form.Plataformas.filter((Plataforma) => Plataforma !== value)
        }
        setForm({ ...form, Plataformas: nuevoArr });
        validate({ ...form, Plataformas: nuevoArr });
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
            if(form.Nombre.length > 50){
                errors.Nombre = "El nombre debe tener menos de 50 caracteres."
            }
        }};
        if(!form.Imagen){
            errors.Imagen = "Debes ingresar url de tu Imagen."
        }
        if(!form.Descripción){
            errors.Descripción = "Debes describir tu Videojuego."
        }
        if(form.Plataformas.length === 0){
            errors.Plataformas = "Debes seleccionar 1 o mas plataformas."
        }
        if(!form.Fecha_de_lanzamiento){
            errors.Fecha_de_lanzamiento = "Debes ingresar una fecha de lanzamiento."
        };

        if(!form.Rating){
            errors.Rating = "Debes ponerle un Rating a tu Videojuego."
        };
        if(form.Rating < 0 || form.Rating > 5){
            errors.Rating = "El Rating no puede ser mayor a 0 o menor a 5."
        };
        if(form.Generos.length === 0){
            errors.Generos = "Debes seleccionar uno o mas Generos."
        }
        setErrors(errors);
        };

    const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.preventDefault);
    axios.post("http://localhost:3001/videogames", form)
    .then(res => {
      const { id } = res.data.videogameCreado;
      alert(`Videojuego creado con exito`);
      setForm({
        Nombre:"",
        Imagen: "",
        Descripción:"",
        Plataformas:[],
        Fecha_de_lanzamiento:'',
        Rating:0,
        Generos:[],
      });
      history.push(`/detail/${id}`);
    })
    .catch(err => alert(err));
    };

    return(
        <form onSubmit={submitHandler} className={style.form}>
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
            <label> Plataformas </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="Playstation 3"
                    value="Playstation 3"
                     /> Playstation 3
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="Playstation 4"
                    value="Playstation 4"
                     /> Playstation 4
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="Playstation 5"
                    value="Playstation 5"
                     /> Playstation 5
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="PC"
                    value="PC"
                     /> PC
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="Xbox 360"
                    value="Xbox 360"
                     /> Xbox 360
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="Xbox One"
                    value="Xbox One"
                     /> Xbox One
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="
                    Xbox Series S/X"
                    value="
                    Xbox Series S/X"
                     /> 
                     Xbox Series S/X
                </label>
                    <label>
                    <input type="checkbox" className={style.checkbox}
                    onChange={(event) => checkHandlerPlat(event)}
                    name="
                    Nintendo Switch"
                    value="
                    Nintendo Switch"
                     /> 
                     Nintendo Switch
                </label>
                {errors.Plataformas && <span>{errors.Plataformas}</span>}
            </div>
            <div>
                <label>Fecha de lanzamiento</label>
                <input type="date" name="Fecha_de_lanzamiento" value={form.Fecha_de_lanzamiento} onChange={changeHandler}/>
                {errors.Fecha_de_lanzamiento && <span>{errors.Fecha_de_lanzamiento}</span>}
            </div>
            <div>
                <label>Rating</label>
                <input type="number" name="Rating" value={form.Rating} onChange={changeHandler}/>
                {errors.Rating && <span>{errors.Rating}</span>}
            </div>
            <div className={style.genresList}>
                <label> Generos </label>
                {generos?.map((genero) => <label key={genero.id}>
                    <input type="checkbox" className={style.checkbox}
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