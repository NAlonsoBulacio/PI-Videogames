import axios from "axios";
export const GET_USERS = "GET_USERS";
export const GET_USERS_BY_NAME = "GET_USERS_BY_NAME";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const GET_GENEROS = "GET_GENEROS";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_USERS_ID = "GET_USERS_ID";
export const EMPTY = "EMPTY";

export const getUsers = (setLoading) => {
return async function(dispatch){
    try{
    const backData = await axios.get('/videogames');
    const users = backData.data;
    dispatch({type: GET_USERS, payload: users});
    setLoading(false);
}catch(error){
    console.log(error);
}};
};
export const getUsersId = (id) => {
return async function(dispatch){
    const backData = await axios.get(`/videogames/${id}`);
    const users = backData.data;
    dispatch({type: GET_USERS_ID, payload: users});
}
};

export const getGenres = () => {
    return async function(dispatch){
        const backData = await axios.get('/genres');
        const generos = backData.data;
        dispatch({type: GET_GENEROS, payload: generos})
    }
}

export const getUsersByName = (nombre) => {
    return async function(dispatch){
        const dataUsers = await axios.get(`/videogames?Nombre=${nombre}`);
        const users = dataUsers.data;
        dispatch({type: GET_USERS_BY_NAME, payload: users});
    }
};

export const filterUsers = (genero) => {
    return async function(dispatch){
        dispatch({type: FILTER, payload: genero});
    }
};

export const filterByCreated = (value) => {
    return async function(dispatch){
        dispatch({type: FILTER_CREATED, payload: value})
    }
}

export const orderUsers = (orden) => {
    return async function(dispatch){
        dispatch({type: ORDER, payload: orden});
    }
};

export const emptyDetail = () => {
    return async function(dispatch){
        dispatch({type: EMPTY })
    }
};