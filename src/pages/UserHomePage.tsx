import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import ControlledCarousel from "../components/user-home-page/ControlledCarousel";
import GridEvents from "../components/user-home-page/GridEvents";


function UserHomePage() {
    return (
        <Box>
            <Header/>
            <ControlledCarousel/>
            <GridEvents/>
        </Box>
    );
}

export default UserHomePage;