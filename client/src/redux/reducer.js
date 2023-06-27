import { GET_USERS,GET_USERS_ID, GET_USERS_BY_NAME, FILTER, GET_GENEROS, FILTER_CREATED, ORDER, EMPTY } from "./actions"


const initialState = {
    users : [],  //este es el que cambias
    allUsers:[],  //este es el que usas para traer todos los videogames
    detail:[],
    generos: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return{...state, users: action.payload, allUsers: action.payload};
        case GET_USERS_ID:
          return{...state, detail: [action.payload]};
        case GET_GENEROS:
            return{...state, generos: action.payload};
        case GET_USERS_BY_NAME:
            return{...state, users: action.payload};
        case FILTER:
                const { allUsers } = state;
                const filteredUsers = action.payload === "Todos" ? allUsers : allUsers.filter((user) =>
                  user.Generos.includes(action.payload));
                return { ...state, users: filteredUsers };
        case FILTER_CREATED:
            const users2 = state.allUsers
            const allusers2 = [...state.users]
            const cretedFiltered = action.payload === "Creados" ? allusers2.filter((user) => user.creadoEnDb) : allusers2.filter((user) => !user.creadoEnDb)
            return{...state, users: action.payload === "Todos" ? users2 : cretedFiltered}
        case ORDER:
            let sortedArr = []
            let sortOrder 
            if(action.payload === "asc" || action.payload === "dsc"){
              sortOrder = action.payload === "asc" ? 1 : -1;
              sortedArr = [...state.users].sort(function(a, b) {
               if (a.Nombre > b.Nombre) {
                 return sortOrder;
               }
               if (a.Nombre < b.Nombre) {
                 return -sortOrder;
               }
               return 0;
             }); 
            }
            if(action.payload === "ascR" || action.payload === "dscR"){
              sortOrder = action.payload === "ascR" ? 1 : -1;
              sortedArr = [...state.users].sort(function(a, b) {
               if (a.Rating > b.Rating) {
                 return sortOrder;
               }
               if (a.Rating < b.Rating) {
                 return -sortOrder;
               }
               return 0;
             }); 
            }

            return {...state, users: sortedArr};
            case EMPTY: 
            return {...state, detail: []};
            default:
            return{...state};
    }
};

export default reducer;