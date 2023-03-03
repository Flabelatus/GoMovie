import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {

    // State variable
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Using the outlet context, to update the state of the alert in the login component
    const { setJwtToken } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { toggleRefresh } = useOutletContext();

    // To redirect somewhere after the login
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // Authenticate the user agains the backend
        event.preventDefault();
        
        // Build the request payload 
        let payload = {
            email: email,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        }

        fetch(`/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toggleRefresh(true);
                    navigate("/");
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage(error);
            })

    }
    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr />

            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    autoComplete="email-new"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    autoComplete="password-new"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />

            </form>
        </div>
    )
}

export default Login;