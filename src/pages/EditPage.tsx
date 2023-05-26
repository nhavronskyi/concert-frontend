import {Box} from "@mui/material";
import EditForm from "../components/EditForm";
import Header from "../components/Header";

function EditPage() {
    return (
        <Box>
            <Header/>
            <h2>Edit Event</h2>
            <EditForm/>
        </Box>
    );
}

export default EditPage;