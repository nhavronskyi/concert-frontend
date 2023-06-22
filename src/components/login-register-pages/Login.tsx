import React, {useState} from "react";
import './login-register.css';
import '../create-event-page/create-event.css'
import {TextField} from "@mui/material";
import {login} from "../../service/EventService";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            if (response.ok) {
                const responseText = await response.text();
                if (responseText.length !== 0) {
                    localStorage.setItem('token', responseText);
                    navigate(`/home`);
                    window.scrollTo(0, 0);
                } else {
                    setErrorMessage("Не правильний логін або пароль");
                }
            } else {
                setErrorMessage("Не правильний логін або пароль");
            }
        } catch (error) {
            setErrorMessage("Виникла помилка під час спроби входу");
        }
    };

    return (<div className="login-register-container login-page">
        <div className="login-register-form">
            <h2 className="login-register-title">Вхід</h2>
            <form onSubmit={handleLogin}>
                <TextField name="email" fullWidth label="Email"
                           variant="standard" value={email}
                           style={{marginBottom: '40px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <TextField name="password" fullWidth  label="Пароль"
                    type="password"  variant="standard"  value={password}
                    style={{ marginBottom: '15px' }}
                    InputLabelProps={{
                        style: { fontSize: '18px' },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <p className="forgot-password"><a href="" >Забули пароль?</a></p>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <div className="button-container">
                    <button type="submit" id="create">Увійти</button>
                </div>
                <a className="register" href="http://localhost:3000/register">Зареєструватись</a>
            </form>
        </div>
    </div>)

}

export default Login;
