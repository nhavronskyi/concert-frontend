import './grid.css';
import {IEvent} from "../../interfaces/IEvent";
import {getAllLocations, getPaginatedEvents} from "../../service/EventService";
import React, {useEffect, useState} from "react";
import Grid from "./Grid";

function EventsFilters() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [pageSize] = useState(9);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        getAllLocations()
            .then(response => response.json())
            .then(json => setCities(json));
    }, []);


    useEffect(() => {
        getPaginatedEvents(page, pageSize)
            .then((response) => response.json())
            .then((json) => {
                setEvents(json.content);
                setTotalPages(json.totalPages);
            });
    }, [page, pageSize]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };
    const handleSearch = () => {
        // Виконати пошук з використанням збережених значень minPrice, maxPrice, selectedCity та selectedDate
    };

    return (<div>
        <div className="empty-space"/>
        <div className="block">
            <div className="filters">
                <input
                    type="text"
                    className="price"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    placeholder="Мінімальна ціна"
                />
                <input
                    type="text"
                    className="price"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    placeholder="Максимальна ціна"
                />
                <select className="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                    <option value="">Місто</option>
                    {cities.map(city => (<option key={city} value={city}>
                            {city}
                        </option>))}
                </select>
                <select className="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                    <option value="">Дата</option>
                    <option value="Сьогодні">Сьогодні</option>
                    <option value="Завтра">Завтра</option>
                    <option value="Цього тижня">Цього тижня</option>
                    <option value="Цього місяця">Цього місяця</option>
                </select>
                <button className="search" onClick={handleSearch}>Пошук</button>
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

export default EventsFilters;
