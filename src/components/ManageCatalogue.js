import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const ManageCatalogue = () => {
    const [movies, setMoviesState] = useState([])
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate();

    // Use effect Hook
    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + jwtToken)


        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        // Add the admin protected endpoint
        fetch(`/admin/movies`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMoviesState(data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [jwtToken, navigate]);

    return (
        <div>
            <h2>Manage Catalouge</h2>
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
                                <Link to={`/admin/movies/${m.id}`}>
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

export default ManageCatalogue;