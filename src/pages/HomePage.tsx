import {Box} from "@mui/material";
import Event from "../components/Event";
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";


function HomePage() {
    return (
        <Box className="body">
            <Header/>
            <Event/>
            <Footer/>
        </Box>
    );
}

export default HomePage;