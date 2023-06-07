import React, {useEffect, useState} from "react";
import {getAllEvents} from "../../service/EventService";
import {Carousel} from "react-bootstrap";
import defaultImage from '../../images/soloviy.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './carousel.css';
import {IEvent} from "../../interfaces/IEvent";
import {format} from "date-fns";
import uk from "date-fns/locale/uk";
import {useNavigate} from "react-router-dom";


function ControlledCarousel() {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getAllEvents().then(response => response.json())
            .then(json => setEvents(shuffle(json)));
    }, []);

    function shuffle(events : IEvent[]) {
        let currentIndex = events.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [events[currentIndex], events[randomIndex]] = [
                events[randomIndex], events[currentIndex]];
        }
        return events;
    }

    const navigate = useNavigate();
    const handleMoreClick = (event: number) => {
        navigate(`/events/show/${event}`);
        window.scrollTo(0, 0);
    };

    return (
        <Carousel className="custom-carousel">
            {events.slice(0,5).map((event) => (
                <Carousel.Item key={event.id}>
                    <div className="image-container">
                        <div className="half event-details">
                            <div className="event-title-description">
                                <h1 className="event-title">{event.title}</h1>
                                <hr className="line"/>
                            </div>
                            <p className="about-event-info">
                                Захід відбудеться {event.date ? format(new Date(event.date), 'd MMMM yyyy', { locale: uk }) : ''} o {event.date ? format(new Date(event.date), 'HH:mm') : ''} годині<br />
                                у місті {event.location}.
                            </p>
                            <button className="more" onClick={() => handleMoreClick(event.id)}> Детальніше </button>
                        </div>
                        <div className="half image-content">
                            <img
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                src={event.image || defaultImage}
                                alt={`Image ${event.id}`}
                            />
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;