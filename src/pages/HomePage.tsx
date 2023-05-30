import {Box} from "@mui/material";
import Event from "../components/Event";
import '../App.css';
import Header from "../components/Header";

function HomePage() {
    return (
        <Box className="body">
            <Header/>
            <Event/>
        </Box>
    );
}

export default HomePage;