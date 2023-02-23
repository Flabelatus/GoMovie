import { Link, Outlet } from "react-router-dom";
// import Home from "./components/Home";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">

          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        
        <div className="col">
          <Link to="#!"><span className="badge bg-success">Login</span></Link>
        </div>
        <hr className="md-3"></hr>
      
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              {/* Use Link to='/endpoint'  instead of <a href="/endpoint"></a>*/}
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
              <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalouge</Link>
              <Link to="graphql" className="list-group-item list-group-item-action">GraphQL</Link>
            </div>
          </nav>
        </div> 

        <div className="col-md-10">
          {/* <Home></Home> */}
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default App;
