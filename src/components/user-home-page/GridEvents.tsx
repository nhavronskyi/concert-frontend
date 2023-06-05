import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {
    getLocation, getPaginatedEvents, getPaginatedEventsByLocation
} from "../../service/EventService";
import React, {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ILocation} from "../../interfaces/ILocation";

function GridEvents() {

    const [events, setEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const locationData: ILocation = {latitude, longitude};

                getLocation(locationData)
                    .then((response) => response.text())
                    .then((data) => setLocation(data));
            }, () => {
                locationDisabled();
            });
        } else {
            locationDisabled();
        }
    }, []);

    useEffect(() => {
        if (location !== null) {
            locationEnabled();
        }
    }, [location, page, pageSize]);

    const locationEnabled = () => {
        const locationParam = location !== null ? location : "Kyiv";

        getPaginatedEventsByLocation(page, pageSize, locationParam)
            .then((response) => response.json())
            .then((json) => {
                setEvents(json.content);
                setTotalPages(json.totalPages);
            });
    };

    const locationDisabled = () => {
        getPaginatedEvents(page, pageSize)
            .then((response) => response.json())
            .then((json) => {
                setEvents(json.content);
                setTotalPages(json.totalPages);
            });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    const navigate = useNavigate();
    const handleMoreClick = (event: number) => {
        navigate(`/events/show/${event}`);
        window.scrollTo(0, 0);
    };

    return (<div className="block">
        <div className="grid-header">
            <div className="grid-title grid-header-half">ТОП-ПОДІЇ {location}
                <hr className="line"/>
            </div>
            <div className="grid-button grid-header-half">
                <button className="black-btn black-btn-big">
                    Усі події
                </button>
            </div>
        </div>
        <ul className="grid-container">
            {events.map((event: IEvent) => (<li className="grid-item">
                <div className="img-date-box">
                    <img src={event.image} className="box-img" alt="page not found" key={event.id}/>
                    <div className="box-date">{event.date.toString().split("T")[0]} </div>
                </div>
                <div className="box-container">
                    <div className="box-title">{event.title} </div>
                    <div className="box-location">{event.location} </div>
                    <button className="black-btn black-btn-small" onClick={() => handleMoreClick(event.id)}>
                        Більше
                    </button>
                </div>
            </li>))}
        </ul>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Pagination
                variant="outlined" shape="rounded"
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                sx={{
                    "& .MuiPaginationItem-root": {
                        borderRadius: "0%",
                        width: "2.5rem",
                        height: "2.5rem",
                        fontWeight: "700",
                        margin: "1rem 0.65rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            />
        </div>
    </div>);
}

export default GridEvents;
