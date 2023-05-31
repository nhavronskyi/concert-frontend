import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {getAllEvents} from "../../service/EventService";
import React, {useEffect, useState} from "react";

function GridEvents() {

    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect((): void => {
        getAllEvents().then(response => response.json())
            .then(json => setEvents(json));
    }, []);

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
                            <img src={event.image} className="box-img" alt="page not found"/>
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
        </div>
    )
}

export default GridEvents;
