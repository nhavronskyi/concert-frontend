import React, {useEffect, useState} from "react";
import {IEvent} from "../interfaces/IEvent";
import '../App.css';
import {Box, Button, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {buttonStyle, getEvent, updateEvent} from "../service/EventService";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";


export function EditForm() {
    const {id} = useParams<{ id: string }>();
    const [event, setOldEvent] = useState<IEvent>();
    const navigate = useNavigate();

    const fetchEvent = () => {
        if (id) {
            getEvent(id)
                .then((response) => response.json())
                .then((json) => setOldEvent(json));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setOldEvent((prevEvent) => prevEvent && {...prevEvent, [name]: value});
    };

    const handleDateTimeChange = (value: Date | null) => {
        if (value) {
            setOldEvent((prevEvent) => prevEvent && {...prevEvent, date: value});
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id && event) {
            updateEvent(id, event)
                .then(() => {
                    navigate(-1);
                });
        }
    };

    const resetFields = () => {
        setOldEvent((prevEvent) => {
            if (prevEvent) {
                const {id} = prevEvent;
                return {
                    ...prevEvent,
                    id,
                    title: '',
                    location: '',
                    description: '',
                    date: new Date(),
                    price: 0,
                };
            }
            return undefined;
        });
    };

    useEffect((): void => {
        fetchEvent();
    }, []);

    return (
        <Box>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            value={event?.title || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="location"
                            label="Location"
                            value={event?.location || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            label="Description"
                            value={event?.description || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            label="Price"
                            value={event?.price || ""}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Date and Time"
                                value={event?.date ? new Date(event.date) : new Date()}
                                defaultValue={new Date()}
                                onChange={handleDateTimeChange}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={buttonStyle()} variant="contained" type="submit">Save</Button>
                        <Button sx={buttonStyle()} variant="contained" onClick={resetFields}>Clear Fields</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default EditForm;