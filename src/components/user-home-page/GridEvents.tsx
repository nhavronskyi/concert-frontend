import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {getPaginatedEvents} from "../../service/EventService";
import React, {useEffect, useState} from "react";
import {Pagination} from "@mui/material";

function GridEvents() {

    const [events, setEvents] = useState<IEvent[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

    useEffect((): void => {
        getPaginatedEvents(page, pageSize)
            .then(response => response.json())
            .then(json => {
                setEvents(json.content);
                setTotalPages(json.totalPages);
            });
    }, [page, pageSize]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    return (
        <div className="block">
            <div className="grid-header">
                <div className="grid-title grid-header-half">ТОП-ПОДІЇ У ЛЬВОВІ
                    <hr className="line"/>
                </div>
                <div className="grid-button grid-header-half">
                    <button className="black-btn black-btn-big">
                        Усі події
                    </button>
                </div>
            </div>
            <ul className="grid-container">
                {events.map((event: IEvent) => (
                    <li className="grid-item">
                        <div className="img-date-box">
                            <img src={event.image} className="box-img" alt="page not found" key={event.id} />
                            <div className="box-date">{event.date.toString().split("T")[0]} </div>
                        </div>
                        <div className="box-container">
                            <div className="box-title">{event.title} </div>
                            <div className="box-location">{event.location} </div>
                            <button className="black-btn black-btn-small">
                                More
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                            fontWeight : "700",
                            margin: "1rem 0.65rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default GridEvents;
