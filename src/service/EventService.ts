import {IEvent} from "../interfaces/IEvent";

const url: string = "http://localhost:8080/events";
const credentials: string = btoa("admin:admin")

const headers = {
    "Authorization": `Basic ${credentials}`,
    "content-type": "application/json"
};
export const getAllEvents = () => {
    return fetch(url, {
        headers: headers
    })
}

export const getEvent = (id: string) => {
    return fetch(`${url}/${id}`, {
        headers: headers,
    });
};

export const updateEvent = (id: string, event: IEvent) => {
    return fetch(`${url}/${id}`, {
        method: "put",
        headers: headers,
        body: JSON.stringify(event)
    });
};

export const deleteEvent = (id: number) => {
    return fetch(`${url}/${id}`, {
        method: "delete",
        headers: headers,
    });
}
export const createEvent = (event: {
    date: string;
    price: string;
    description: string;
    location: string;
    title: string
}) => {
    return fetch(`${url}`, {
        method: "post",
        headers: headers,
        body: JSON.stringify(event)
    });
};

export const uploadImage = (title: string, file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch(`${url}/image/${title}`, {
        method: 'post',
        headers: {
            "Authorization": `Basic ${credentials}`
        },
        body: formData
    }).then(r => r);
};

export const getImage = (title: string) => {
    return `${url}/image/${title}`;
};

export const buttonStyle = () => {
    return {
        padding: "2px",
        margin: "2px",
        backgroundColor: "black",
        ":hover": {
            backgroundColor: "white",
            color: "black"
        }
    }
}