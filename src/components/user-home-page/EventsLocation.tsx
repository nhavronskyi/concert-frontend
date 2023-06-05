import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {findLocation, getPaginatedEvents, getPaginatedEventsByLocation} from "../../service/EventService";
import React, {useEffect, useState} from "react";
import {ILocation} from "../../interfaces/ILocation";
import Grid from "./Grid";
import {useNavigate} from "react-router-dom";

function EventsLocation() {

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

                findLocation(locationData)
                    .then((response) => response.text())
                    .then((data) => setLocation(data));
            }, () => {
                locationDisabled();
            });
        } else {
            locationDisabled();
        }
    }, [page, pageSize]);

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
    const handleFilterClick = () => {
        navigate(`/home/filters`);
    };

    return (  <div>
        <div className="empty-space"/>
        <div className="grid-header block">
            <div className="grid-title grid-header-half">
                ТОП-ПОДІЇ {location}
                <hr className="line"/>
            </div>
            <div className="grid-button grid-header-half">
                <button onClick={handleFilterClick} className="black-btn black-btn-big">
                    Усі події
                </button>
            </div>
        </div>
        <Grid
            events={events}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
        />
    </div>);
}

export default EventsLocation;
