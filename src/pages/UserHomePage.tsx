import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import ControlledCarousel from "../components/user-home-page/ControlledCarousel";

function UserHomePage() {
    return (
        <Box>
            <Header/>
            <ControlledCarousel/>
        </Box>
    );
}

export default UserHomePage;