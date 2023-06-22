import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Register from "../components/login-register-pages/Register";

function RegisterPage() {
    return (
        <Box>
            <Header/>
            <Register/>
            <Footer/>
        </Box>
    );
}

export default RegisterPage;