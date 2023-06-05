import React, {useState} from "react";
import {Box, Button, Input, TextField} from "@mui/material";
import {buttonStyle, createEvent, getImage, uploadImage} from "../service/EventService";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';

export function CreateEvent() {
    const
        [title, setTitle] = useState(""),
        [location, setLocation] = useState(""),
        [description, setDescription] = useState(""),
        [date, setDate] = useState<Date | null>(null),
        [price, setPrice] = useState(""),
        [image, setImage] = useState("");

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "location") {
            setLocation(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        } else if (e.target.name === "price") {
            setPrice(e.target.value);
        } else if (e.target.name === "image") {
            const files = e.target.files;
            if (files) {
                uploadImage(title, files[0]);
                setImage(getImage(title));
            }
        }
    };
    const addEvent = (): void => {
        const event = {title, location, description, date: date || new Date(), price, image};
        createEvent(event).then(r => r);
    };

    const refreshFields = (): void => {
        setTitle("");
        setLocation("");
        setDescription("");
        setDate(null);
        setPrice("");
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
            <form onSubmit={addEvent}>
                <Box><TextField name="title" id="title" fullWidth label="Title" variant="standard" value={title}
                                onChange={handleChanges}/></Box>
                <Box><TextField name="location" id="location" fullWidth label="Location" variant="standard"
                                value={location}
                                onChange={handleChanges}/></Box>
                <Box><TextField name="description" id="description" fullWidth multiline rows={4} label="Description"
                                value={description}
                                variant="standard" onChange={handleChanges}/></Box>
                <Box><TextField name="price" id="price" label="Price" fullWidth variant="standard" value={price}
                                onChange={handleChanges}/></Box>
                <br/>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Date and Time"
                            value={date}
                            defaultValue={new Date()}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <br/>
                <Input type="file" name="image" id="image"
                       onChange={handleChanges}/>
                <br/><br/>

                <Button type="submit" id="create" variant="contained"
                        sx={buttonStyle}>create</Button>
                <Button onClick={refreshFields} id="refresh" variant="contained"
                        sx={buttonStyle}>refresh fields</Button>
            </form>
        </Box>
    );
}