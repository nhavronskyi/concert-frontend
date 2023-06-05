import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import ControlledCarousel from "../components/user-home-page/ControlledCarousel";
import EventsFilters from "../components/user-home-page/EventsFilters";


function UserHomePage() {
    return (
        <Box>
            <Header/>
            <ControlledCarousel/>
            <EventsFilters/>
        </Box>
    );
}

export default UserHomePage;