import React, {useEffect, useState} from "react";
import {IEvent} from "../interfaces/IEvent";
import '../App.css';
import {Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {buttonStyle, deleteEvent, getAllEvents} from "../service/EventService";

export function Event() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const navigate = useNavigate();

    const handleEditClick = (event: number) => {
        navigate(`/events/${event}`);
    };

    useEffect((): void => {
        getAllEvents().then(response => response.json())
            .then(json => setEvents(json));
    }, []);
    return (
        <Box>
            <Grid container spacing={1}>
                {events.map((event: IEvent) => (
                    <Grid key={event.id} item md={4} sx={{
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
                        <Box>Image: <br/> <img src={event.image} width="60" height="60" alt="page not found"/></Box>

                        <Button variant="contained" onClick={() => handleEditClick(event.id)}
                                sx={buttonStyle()}>Edit</Button>
                        <Button variant="contained" onClick={() => {
                            deleteEvent(event.id)
                            navigate(0)
                        }} sx={buttonStyle()}>Delete</Button>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" onClick={() => navigate(`/create`)} sx={buttonStyle()}>Create Event</Button>
        </Box>
    )
}

export default Event;