import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import EventsFilters from "../components/user-home-page/EventsFilters";
import Footer from "../components/Footer";

function UserHomePage() {
    return (
        <Box>
            <Header/>
            <EventsFilters/>
            <Footer/>
        </Box>
    );
}

export default UserHomePage;