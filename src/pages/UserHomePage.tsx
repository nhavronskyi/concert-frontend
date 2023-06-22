import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import ControlledCarousel from "../components/user-home-page/ControlledCarousel";
import EventsLocation from "../components/user-home-page/EventsLocation";
import Footer from "../components/Footer";


function UserHomePage() {
    return (
        <Box>
            <Header/>
            <ControlledCarousel/>
            <EventsLocation/>
            <Footer/>
        </Box>
    );
}

export default UserHomePage;