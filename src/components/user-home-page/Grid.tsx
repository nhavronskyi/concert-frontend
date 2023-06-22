import React from 'react';
import {Pagination} from "@mui/material";
import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {useNavigate} from "react-router-dom";

interface GridProps {
    events: IEvent[];
    totalPages: number;
    page: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const Grid: React.FC<GridProps> = ({
                                       events,
                                       totalPages,
                                       page,
                                       handlePageChange,
                                   }) => {

    const navigate = useNavigate();
    const handleMoreClick = (event: number) => {
        navigate(`/events/show/${event}`);
        window.scrollTo(0, 0);
    };

    return (<div className="block">
            <ul className="grid-container">
                {events.map((event: IEvent) => (<li className="grid-item" key={event.id}>
                        <div className="img-date-box">
                            <img src={event.image} className="box-img" alt="page not found"/>
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
                    variant="outlined"
                    shape="rounded"
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
};

export default Grid;
