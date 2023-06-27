import React, { useState, useEffect } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Pagination from "../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getGenres, filterUsers, filterByCreated, orderUsers } from "../../redux/actions";




const Home = () => {
    const users = useSelector(state => state.users);
    const generos = useSelector(state => state.generos);
    const [currentPage, setCurrentPage] = useState(1);
    const [genreFilter, setGenreFilter] = useState('Todos');
    const [createdFilter, setCreatedFilter] = useState('Todos');
    const [orden, setOrden] = useState('')
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 15;
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getUsers(() => setLoading(false)));
    dispatch(getGenres());
    }, [dispatch, currentPage, itemsPerPage])

    const handleFilterGenre = (e) => {
      const genre = e.target.value;
      setGenreFilter(genre);
      dispatch(filterUsers(genre));
      setCurrentPage(1);
    };

    const handleFilterByCreated = (e) => {
      const created = e.target.value
      dispatch(filterByCreated("Todos"));
      setCreatedFilter(created);
      dispatch(filterByCreated(created));
      setCurrentPage(1);
    };

    const handleSort = (e) => {
      e.preventDefault();
      dispatch(orderUsers(e.target.value))
      setCurrentPage(1)
      setOrden(e.target.value)
    }
  

    const filteredVideogames = users.filter((user) => {
      const genreMatch = genreFilter === 'Todos' || user.Generos.includes(genreFilter);
      const createdMatch = createdFilter === 'Todos' || (createdFilter === 'Creados' && user.creadoEnDb) || (createdFilter === 'Api' && !user.creadoEnDb);
      let sortedArr = []
      let sortOrder 
      if(orden === "asc" || orden === "dsc"){
        sortOrder = orden === "asc" ? 1 : -1;
        sortedArr = users.sort(function(a, b) {
         if (a.Nombre > b.Nombre) {
           return sortOrder;
         }
         if (a.Nombre < b.Nombre) {
           return -sortOrder;
         }
         return 0;
       }); 
      }
      if(orden === "ascR" || orden === "dscR"){
        sortOrder = orden === "ascR" ? 1 : -1;
        sortedArr = users.sort(function(a, b) {
         if (a.Rating > b.Rating) {
           return sortOrder;
         }
         if (a.Rating < b.Rating) {
           return -sortOrder;
         }
         return 0;
       }); 
      }
      return genreMatch && createdMatch && sortedArr;
    });
  
    const allVideogames = filteredVideogames.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = [];
    if(genreFilter === 'Todos'){
    currentItems = filteredVideogames.slice(indexOfFirstItem, indexOfLastItem);
    }else{ 
    currentItems = filteredVideogames.filter((user) => user.Generos.includes(genreFilter)
    ).slice(indexOfFirstItem, indexOfLastItem);
    };

console.log(allVideogames);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    
      return (
        <div className="home">
          <SearchBar 
          handleSort={handleSort}
          handleFilterGenre={handleFilterGenre}
          handleFilterByCreated={handleFilterByCreated}
          generos={generos} 
          />
        {loading ? (
         <div className="loading">
          <img src={require("./bart-simpson-video-games.gif").default} alt="Loading" />
         </div>
          ) : (
        <>
          <CardsContainer users={currentItems} />
          <Pagination
           currentItems={currentItems}
            itemsPerPage={itemsPerPage}
            allVideogames={allVideogames}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
        </div>
      );
}

export default Home;