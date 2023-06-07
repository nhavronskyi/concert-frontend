import React, {useState} from "react";
import './login-register.css';
import '../create-event-page/create-event.css'
import {TextField} from "@mui/material";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            fetch('/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({email, password}),
            });
        } catch (error) {
            console.error('Помилка входу:', error);
            // Обробляємо помилку входу
        }
    };

    return (<div className="login-register-container login-page">
        <div className="login-register-form">
            <h2 className="login-register-title">Логін</h2>
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
                <div className="button-container">
                    <button type="submit" id="create">Увійти</button>
                </div>
            </form>
        </div>
    </div>)

}

export default Login;
