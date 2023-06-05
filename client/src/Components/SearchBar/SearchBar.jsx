import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

const SearchBar = ({ generos, handleFilterGenre, handleFilterByCreated, handleSort }) => {


    const [nombre, setNombre] = useState('')
    const dispatch = useDispatch();

    const changeHandler = (event) => {

        const value = event.target.value;
        setNombre(value)
        }

    const handleNombre = (e) => {
        e.preventDefault();
        dispatch(getUsersByName(nombre));
        alert(`buscando videogames que coincidan con <${nombre}>`);
        setNombre('');
       };


    return(
        <div className={style.searchBar}>
            <label> Filtrar Videojuegos</label> 
            <select onChange={(e) => handleFilterByCreated(e)}>
                <option value="Todos">Todos</option>
                <option value="Api">Originales</option>
                <option value="Creados">Creados</option>
            </select>    
            <select onChange={(e) => handleFilterGenre(e)}>
                <option value="Todos">Todos</option>
                {generos?.map((genero) => 
                <option key={genero.id} 
                value={genero.Nombre}
                >{genero.Nombre}</option>
                )}
            </select>    
            <label> Busca un Videogame</label>
            <input type="text" name="Nombre" value={nombre} onChange={changeHandler} placeholder="Buscar..."/>
            <button onClick={(e) => handleNombre(e)}>Buscar por Nombre</button>
            <label> Ordenar por</label> 
            <select onChange={(e) => handleSort(e)} >
            <option disabled selected value=""> ordenar </option>
                <option value="asc">Nombre Ascendente</option>
                <option value="dsc">Nombre Descendente</option>
            </select>  
        </div>
    );
}

export default SearchBar;