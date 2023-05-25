import {IEvent} from "../interfaces/IEvent";

const url = "http://localhost:8080/events";
const credentials = btoa("admin:admin")

export const getAllEvents = () => {
    return fetch(url, {
        headers: {
            "Authorization": `Basic ${credentials}`
        }
    })
}

export const getEvent = (id: string) => {
    return fetch(`${url}/${id}`, {
        headers: {
            "Authorization": `Basic ${credentials}`
        },
    });
};

export const updateEvent = (id: string, event: IEvent) => {
    return fetch(`${url}/${id}`, {
        method: "put",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(event)
    });
};
export const createEvent = (event: {
    date: string;
    price: string;
    description: string;
    location: string;
    title: string
}) => {
    return fetch(`${url}`, {
        method: "post",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(event)
    });
};