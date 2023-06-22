import {Box} from "@mui/material";
import EditForm from "../components/EditForm";
import Header from "../components/Header";
import '../index.css';
import Footer from "../components/Footer";

function EditPage() {
    return (
        <Box className="body">
            <Header/>
            <h2>Edit Event</h2>
            <EditForm/>
            <Footer/>
        </Box>
    );
}

export default EditPage;