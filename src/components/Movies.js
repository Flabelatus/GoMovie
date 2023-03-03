import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {

    const [movies, setMoviesState] = useState([])

    // Use effect Hook
    useEffect( () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method: "GET",
            headers: headers,   
        }

        fetch(`http://localhost:8080/movies`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setMoviesState(data);
        })
        .catch(err => {
            console.log(err);
        })

    }, []);

    return (
        <div>
            <h2>Movies</h2>
            <hr />
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Movies</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {/* iterate through the list using the map */}
                    {movies.map((m) => 
                    <tr key={m.id}>
                        <td>
                            <Link to={`/movies/${m.id}`}>
                                {m.title}
                            </Link>
                        </td>
                        <td>{m.release_date}</td>
                        <td>{m.mpaa_rating}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Movies;