import React, { useState, useEffect } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Pagination from "../../Components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getGenres, filterUsers, filterByCreated, orderUsers } from "../../redux/actions";
// import { useHistory, useLocation } from "react-router-dom";



const Home = () => {
    const users = useSelector(state => state.users);
    const generos = useSelector(state => state.generos);
    const allUsers = useSelector(state => state.allUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const [orden, setOrden] = useState('')



    // const history = useHistory();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const currentPage = parseInt(queryParams.get("page")) || 1;
    const itemsPerPage = 15;
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getUsers(currentPage, itemsPerPage));
    dispatch(getGenres());
    }, [dispatch, currentPage, itemsPerPage])

    const handleFilterGenre = (e) => {
      dispatch(filterUsers(e.target.value))
    };

    const handleFilterByCreated = (e) => {
      dispatch(filterByCreated(e.target.value))
    };

    const handleSort = (e) => {
      e.preventDefault();
      dispatch(orderUsers(e.target.value))
      setCurrentPage(1)
      setOrden(`Ordenado ${e.target.value}`)
    }
  

    const allVideogames = users.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
          <CardsContainer users={currentItems} />
          <Pagination
            itemsPerPage={itemsPerPage}
            allVideogames={allVideogames}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      );
}

export default Home;