import React, {useEffect, useState} from "react";
import {IEvent} from "../interfaces/IEvent";
import '../App.css';
import {Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CreateEvent} from "./CreateEvent";

export function Event() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const url = "http://localhost:8080/events";
    const navigate = useNavigate();
    const credentials = btoa("admin:admin")

    const getAll = () => fetch(url, {
        headers: {
            "Authorization": `Basic ${credentials}`
        }
    })
        .then(response => response.json())
        .then(json => setEvents(json));

    const handleEditClick = (event: number) => {
        navigate(`/events/${event}`);
    };

    useEffect((): void => {
        getAll().then(e => e)
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
                        <Box>Date: {event.date.toString()} </Box>
                        <Box>Price: {event.price} hrn</Box>
                        <Button onClick={() => handleEditClick(event.id)}>Edit</Button>
                    </Grid>
                ))}
            </Grid>
            <CreateEvent/>
        </Box>
    )
}

export default Event;