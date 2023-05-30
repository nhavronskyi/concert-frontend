import {Box} from "@mui/material";
import EditForm from "../components/EditForm";
import Header from "../components/Header";
import '../index.css';

function EditPage() {
    return (
        <Box className="body">
            <Header/>
            <h2>Edit Event</h2>
            <EditForm/>
        </Box>
    );
}

export default EditPage;