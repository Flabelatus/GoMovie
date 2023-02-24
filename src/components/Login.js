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

    // To redirect somewhere after the login
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("email/pass", email, password)

        if (email === "admin@example.com") {
            setJwtToken("abc");
            // Update the state of the alert from the login component
            setAlertClassName("d-none");
            setAlertMessage("");

            // call navigate here
            navigate("/")
        } else {
            setAlertClassName("alert-danger");
            setAlertMessage("Invalid credentials")
        }

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