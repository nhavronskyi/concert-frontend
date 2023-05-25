import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";


export function CreateEvent() {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "location") {
            setLocation(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        } else if (e.target.name === "date") {
            setDate(e.target.value);
        } else if (e.target.name === "price") {
            setPrice(e.target.value);
        }
    }
    const addEvent = (): void => {
        const event = {title, location, description, date, price};

        const credentials = btoa("admin:admin")

        fetch("http://localhost:8080/events", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify(event)
        });
        window.location.reload();
    };

    return (
        <Box sx={{
            maxWidth: "40%",
            borderStyle: "outset",
            borderRadius: '10px',
            padding: "10px",
            margin: "10px",
            backgroundColor: "white"
        }}>
            <Box><TextField name="title" id="title" fullWidth label="Title" variant="standard"
                            onChange={handleChanges}/></Box>
            <Box><TextField name="location" id="location" fullWidth label="Location" variant="standard"
                            onChange={handleChanges}/></Box>
            <Box><TextField name="description" id="description" fullWidth multiline rows={4} label="Description"
                            variant="standard" onChange={handleChanges}/></Box>
            <Box><TextField name="date" id="date" label="Date" fullWidth variant="standard"
                            onChange={handleChanges}/></Box>
            <Box><TextField name="price" id="price" label="Price" fullWidth variant="standard"
                            onChange={handleChanges}/></Box>
            <br/>
            <Button onClick={addEvent} id="create" variant="contained"
                    sx={{padding: "2px", margin: "2px"}}>create</Button>
            <Button onClick={() => window.location.reload()} id="refresh" variant="contained"
                    sx={{padding: "2px", margin: "2px"}}>refresh</Button>
        </Box>
    );
}