import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import UserCreateEvent from "../components/create-event-page/UserCreateEvent";
import Footer from "../components/Footer";

function UserCreatePage() {
    return (
        <Box>
            <Header/>
            <UserCreateEvent/>
            <Footer/>
        </Box>
    );
}

export default UserCreatePage;