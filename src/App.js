import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
// import Home from "./components/Home";

function App() {
  // State variable
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  
  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include"
    }

    // Send request to the logout endpoint and setJWT to empty string
    fetch("/logout", requestOptions)
    .catch(error => {
      console.log("error logging out", error);
    })
    .finally(() => {
      setJwtToken("");
      toggleRefresh(false);
    })

    // navigate to the login page
    navigate("/login");
  }

  // Use a simple hook such as callback to wrap toggleRefresh in
  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      console.log("turning on ticking");
      let i = setInterval(() => {

        const requestOptions = {
          method: "GET",
          credentials: "include",
        }

        fetch("/refresh", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
          }
        })

        console.log("this will run every second");
      }, 600000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
    } else {
      console.log("turning off ticking");
      console.log("turning off tick inteval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval)
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      // Get new tokens
      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(error => {
          console.log("user is not logged in", error);
        })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div className="p-3 mb-2 bg-dark text-white">
      <div className="row">
        <div className="col">

          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>

        <div className="col" style={{ display: "flex", justifyContent: "flex-end", marginRight: 20 }}>
          {jwtToken === ""
            ? <Link to="/login"><span className="badge bg-trasnparent">Login</span></Link>
            : <a href="#!" onClick={logOut}><span className="btn btn-danger">Logout</span></a>
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
            toggleRefresh,
          }}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
