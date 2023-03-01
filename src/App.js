import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
// import Home from "./components/Home";

function App() {
  // State variable
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  
  const navigate = useNavigate();

  const logOut = () => {
    setJwtToken("");
    navigate("/login");
  }

  return (
    <div className="p-3 mb-2 bg-dark text-white">
      <div className="row">
        <div className="col">

          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>

        <div className="col">
          {jwtToken === ""
            ? <Link to="/login"><span className="badge bg-success">Login</span></Link>
            : <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>
          }
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
              {jwtToken !== "" &&
                <>
                  <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
                  <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalouge</Link>
                  <Link to="graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
              }

            </div>
          </nav>
        </div>

        <div className="col-md-10">

          <Alert message={alertMessage} className={alertClassName} />

          {/* <Home></Home> */}
          {/* Outlet to set the environment vairables such as JWT or Set other variables such as message or classname for the alert */}
          <Outlet context={{
            jwtToken,
            setJwtToken,
            setAlertClassName,
            setAlertMessage,
          }}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
