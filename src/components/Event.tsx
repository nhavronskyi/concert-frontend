import React, {useEffect, useState} from "react";
import {IEvent} from "../interfaces/IEvent";
import '../App.css';
import {Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CreateEvent} from "./CreateEvent";
import {deleteEvent, getAllEvents, buttonStyle} from "../service/EventService";

export function Event() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const navigate = useNavigate();

    getAllEvents().then(response => response.json())
        .then(json => setEvents(json));

    const handleEditClick = (event: number) => {
        navigate(`/events/${event}`);
    };

    useEffect((): void => {
        getAllEvents().then(e => e)
    }, []);
    return (
        <Box>
            <Grid container spacing={1}>
                {events.map((event: IEvent) => (
                    <Grid key={event.id} item xs={6} md={4} sx={{
                        borderStyle: "outset",
                        borderRadius: '10px',
                        padding: "10px",
                        backgroundColor: "white"
                    }}>
                        <Box>Title: {event.title} </Box>
                        <Box>Location: {event.location} </Box>
                        <Box>Description: {event.description} </Box>
                        <Box>Date: {event.date.toString().split("T")[0]} </Box>
                        <Box>Price: {event.price} hrn</Box>                       
                        <Button variant="contained" onClick={() => handleEditClick(event.id)} sx={buttonStyle()}>Edit</Button>
                        <Button variant="contained" onClick={() => deleteEvent(event.id)} sx={buttonStyle()}>Delete</Button>
                    </Grid>
                ))}
            </Grid>
            <CreateEvent/>
        </Box>
    )
}

export default Event;