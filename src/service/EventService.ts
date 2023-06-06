import {IEvent} from "../interfaces/IEvent";
import {ILocation} from "../interfaces/ILocation";

const urlEvents: string = "http://localhost:8080/events";
const url: string = "http://localhost:8080";
const credentials: string = btoa("admin:admin")

const headers = {
    "Authorization": `Basic ${credentials}`,
    "content-type": "application/json"
};
export const getAllEvents = () => {
    return fetch(urlEvents, {
        headers: headers
    })
}

export const findLocation = (locationData: ILocation) => {
    return fetch(`${url}/location?latitude=${locationData.latitude}&longitude=${locationData.longitude}`, {
        method: "get",
        headers: headers,
    });
}

export const getAllLocations = () => {
    return fetch(`${url}/location/all`, {
        method: "get",
        headers: headers
    })
}


export const getFilteredEvents = (page: number, size: number, searchData: any) => {
    return fetch(`${urlEvents}/filtered?page=${page}&size=${size}`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(searchData)
    });
};

export const getPaginatedEvents = (page: number, size: number) => {
    return fetch(`${urlEvents}/pagination?page=${page}&size=${size}`, {
        method: "get",
        headers: headers
    })
}

export const getPaginatedEventsByLocation = (page: number, size: number, location: string) => {
    return fetch(`${urlEvents}/pagination/location?page=${page}&size=${size}&location=${location}`, {
        method: "get",
        headers: headers,
    });
}

export const getEvent = (id: string) => {
    return fetch(`${urlEvents}/${id}`, {
        headers: headers,
    });
};

export const updateEvent = (id: string, event: IEvent) => {
    return fetch(`${urlEvents}/${id}`, {
        method: "put",
        headers: headers,
        body: JSON.stringify(event)
    });
};

export const deleteEvent = (id: number) => {
    return fetch(`${urlEvents}/${id}`, {
        method: "delete",
        headers: headers,
    });
}
export const createEvent = (event: {
    date: Date;
    price: string;
    description: string;
    location: string;
    title: string
}) => {
    return fetch(`${urlEvents}`, {
        method: "post",
        headers: headers,
        body: JSON.stringify(event)
    });
};

export const uploadImage = (title: string, file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch(`${urlEvents}/image/${title}`, {
        method: 'post',
        headers: {
            "Authorization": `Basic ${credentials}`
        },
        body: formData
    }).then(r => r);
};

export const getImage = (title: string) => {
    return `${urlEvents}/image/${title}`;
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