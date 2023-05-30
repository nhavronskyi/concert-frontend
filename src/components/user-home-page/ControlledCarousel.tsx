import {useState} from "react";
import {getAllEvents} from "../../service/EventService";
import {Carousel} from "react-bootstrap";
import defaultImage from '../../images/soloviy.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './carousel.css';
import {IEvent} from "../../interfaces/IEvent";


function ControlledCarousel() {
    const [events, setEvents] = useState<IEvent[]>([]);

    getAllEvents().then(response => response.json())
        .then(json => setEvents(json));

    return (
        <Carousel>
            {events.map((event) => (
                <Carousel.Item key={event.id}>
                    <div className="image-container">
                        <div className="image-content">
                            <img
                                className="d-block w-100"
                                src={event.image || defaultImage}
                                alt={`Image ${event.id}`}
                            />
                        </div>
                        <div className="event-details">
                            <div className="event-title-description">
                                <h1 className="event-title">{event.title}</h1>
                                <h3 className="event-description">{event.description}</h3>
                            </div>
                            <p className="event-location">{event.location}</p>
                            <p className="event-date-price">
                                <span className="event-date">{event.date.toString().split("T")[0]}</span>
                                <span className="event-price">{event.price} uah</span>
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;