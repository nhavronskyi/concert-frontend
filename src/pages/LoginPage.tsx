import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/login-register-pages/Login";

function LoginPage() {
    return (
        <Box>
            <Header/>
            <Login/>
            <Footer/>
        </Box>
    );
}

export default LoginPage;