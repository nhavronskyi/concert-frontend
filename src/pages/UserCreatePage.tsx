import {Box} from "@mui/material";
import '../App.css';
import Header from "../components/Header";
import UserCreateEvent from "../components/create-event-page/UserCreateEvent";

function UserCreatePage() {
    return (
        <Box>
            <Header/>
            <UserCreateEvent/>
        </Box>
    );
}

export default UserCreatePage;