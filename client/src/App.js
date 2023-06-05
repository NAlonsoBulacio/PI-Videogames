import './App.css';
import { Home, Landing, Form, Detail } from "./Views/index"
import NavBar from "./Components/NavBar/NavBar"
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  return (
    <div className="App">
       {location.pathname !== "/" && <NavBar />}
       <Route exact path="/" component={Landing} />
       <Route path="/home" component={Home} />
       <Route path="/create" component={Form} />
       <Route path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
