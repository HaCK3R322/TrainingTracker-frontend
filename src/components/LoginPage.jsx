import React, {useState} from 'react';
import '../style/theme.css'
import '../style/loginpage.css'
import fetchPost from "../api/fetchPost";
import BackendUrls from '../api/BackendUrls.json';


const LoginPage = ({setLoggedIn}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        let request = {
            username: login,
            password: password
        }

        fetchPost(BackendUrls.urls.register, request)
            .then(response => response.json())
            .then(() => {
                fetchPost(BackendUrls.urls.authenticate, request)
                    .then(response => {
                        if(response.ok) {
                            return response.text()
                        } else {
                            throw Error("Wrong credentials");
                        }
                    })
                    .then(jwt => {
                        window.localStorage.setItem("JWT", jwt);
                        setLoggedIn(true);
                    })
                    .catch(error => {
                        alert(error.message);
                    })
            })
    }

    return (
        <div className={"training-tracker-theme"}>
            <div className={"wrapper"}>
                <div className={"main-container"}>
                    <div className={"title-container"}>
                        <div>Login</div>
                    </div>
                    <br />
                    <div className={"input-container login"}>
                        <input
                            value={login}
                            placeholder="Enter your login here"
                            onChange={ev => setLogin(ev.target.value)}
                            className={"inputBox"}
                        />
                    </div>
                    <br />
                    <div className={"input-container password"}>
                        <input
                            value={password}
                            placeholder="Enter your password here"
                            onChange={ev => setPassword(ev.target.value)}
                            className={"inputBox"}
                            type={"password"}
                        />
                    </div>
                    <br />
                    <div className={"input-container input-button"}>
                        <input
                            className={"inputButton"}
                            type="button"
                            onClick={() => {handleLogin()}}
                            value={"Log in"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;