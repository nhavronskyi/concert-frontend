import React, {useState} from "react";
import {TextField} from "@mui/material";
import '../create-event-page/create-event.css'
import './login-register.css';
import {register} from "../../service/EventService";
import {useNavigate} from "react-router-dom";


export function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
            const response = await register(firstName, lastName, email, password);

            if (response.ok) {
                const responseText = await response.text();
                if (responseText.length !== 0) {
                    localStorage.setItem('token', responseText);
                    navigate(`/home`);
                    window.scrollTo(0, 0);
                } else {
                    setErrorMessage("Користувач з таким email уже існує");
                }
            } else {
                setErrorMessage("Користувач з таким email уже існує");
            }
        } catch (error) {
            setErrorMessage("Виникла помилка під час спроби реєсстрації");
        }
    };

    return (
        <div className="login-register-container register-page">
            <div className="login-register-form">
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegistration}>
                <TextField name="firsName" fullWidth label="Ім'я"
                           variant="standard" value={firstName}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setFirstName(e.target.value)}/>
                <TextField name="lastName" fullWidth label="Прізвище"
                           variant="standard" value={lastName}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setLastName(e.target.value)}/>
                <TextField name="email" fullWidth label="Email"
                           type="email" variant="standard" value={email}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField name="password" fullWidth  label="Пароль"
                           type="password"  variant="standard"  value={password}
                           style={{ marginBottom: '30px' }}
                           InputLabelProps={{
                               style: { fontSize: '18px' },
                           }}
                           onChange={(e) => setPassword(e.target.value)}
                />
                <TextField name="password" fullWidth  label="Повторіть пароль"
                           type="password"  variant="standard"  value={confirmPassword}
                           style={{ marginBottom: '30px' }}
                           InputLabelProps={{
                               style: { fontSize: '18px' },
                           }}
                           onChange={(e) => {
                               setConfirmPassword(e.target.value);
                               setPasswordMismatch(false);
                           }}/>
                {passwordMismatch && <p>Паролі не збігаються</p>}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <div className="button-container">
                    <button type="submit" id="create">Зареєструватися</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Register;
