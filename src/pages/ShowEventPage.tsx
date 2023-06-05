import React, {useEffect, useState} from "react";
import {IEvent} from "../interfaces/IEvent";
import '../App.css';
import {useParams} from "react-router-dom";
import {getEvent} from "../service/EventService";
import DescriptionConverter from "../components/show-event-page/DescriptionConverter";
import Header from "../components/Header";
import {format} from "date-fns";
import uk from 'date-fns/locale/uk';
import location from "../images/location.png";
import calendar from "../images/calendar.png";
import money from "../images/money.png";

export function ShowEventPage() {
    const {id} = useParams<{ id: string }>();
    const [event, setEvent] = useState<IEvent>({
        id: 0, title: "", location: "", description: "", date: new Date(), price: 0, image: ""
    });

    const formattedDate = event.date ? format(new Date(event.date), 'd MMMM yyyy', {locale: uk}) : '';
    const formattedTime = event.date ? format(new Date(event.date), 'HH:mm') : '';

    const fetchEvent = () => {
        if (id) {
            getEvent(id)
                .then((response) => response.json())
                .then((json) => setEvent(json));
        }
    };

    useEffect((): void => {
        fetchEvent();
    }, []);

    return (<div>
            <Header/>
            <div className="main-img">
                <img src={event.image} alt="Image not found" key={event.id} className="img-cover"/>
            </div>
            <div className="image-text">{event.title} </div>
            <div className="container">
                <div className="section1">
                    <p className="about-event"> ПРО ПОДІЮ </p>
                    <p className="about-event-info">
                        "{event.title}" відбудеться {formattedDate} o <u>{formattedTime}</u> годині у
                        місті {event.location}.
                    </p>
                    <DescriptionConverter description={event.description}/>
                </div>

                <div className="section2">
                    <div className="section2-fixed">
                        <div className="black-box"><p>{event.title}</p></div>
                        <div className="section2-text">
                            <div className="icon-text">
                                <img src={location} alt="location"/>
                                <p>{event.location}</p>
                            </div>
                            <div className="icon-text">
                                <img src={calendar} alt="location"/>
                                <p>{formattedDate} o {formattedTime}</p>
                            </div>
                            <div className="icon-text">
                                <img src={money} alt="location"/>
                                <p>{event.price} грн </p>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button className="black-btn-sm"> Купити </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default ShowEventPage;