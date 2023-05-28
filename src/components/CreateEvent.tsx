import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {buttonStyle, createEvent} from "../service/EventService";
import {useNavigate} from "react-router-dom";


export function CreateEvent() {
    const
        [title, setTitle] = useState(""),
        [location, setLocation] = useState(""),
        [description, setDescription] = useState(""),
        [date, setDate] = useState(""),
        [price, setPrice] = useState("");

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
        };
    const addEvent = (): void => {
            const event = {title, location, description, date, price};
            createEvent(event).then(r => r);
        };
    const refresh = useNavigate();




    return (
        <Box sx={{
            maxWidth: "40%",
            borderStyle: "outset",
            borderRadius: '10px',
            padding: "10px",
            margin: "10px",
            backgroundColor: "white"
        }}>
            <form onSubmit={addEvent}>
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
                <Box><input type="file" name="image" id="image"  onChange={handleChanges}/></Box>
                <br/>
                <Button type="submit" id="create" variant="contained"
                        sx={buttonStyle}>create</Button>
                <Button onClick={() => refresh(0)} id="refresh" variant="contained"
                        sx={buttonStyle}>refresh fields</Button>
            </form>
        </Box>
    );
}