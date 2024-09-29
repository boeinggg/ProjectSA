import { BookingEquipmentInterface } from "../../../interfaces/IBookingEquipment";


const apiUrl = "http://localhost:3036";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

//--------------------------------------------------Booking Equipment---------------------------------------------------
async function GetBookingEquipment() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/bookingequipments`, requestOptions);
}

async function GetBookingEquipmentId(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/bookingequipments/${id}`, requestOptions);
}

async function CreateBookingEquipment(data: BookingEquipmentInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/bookingequipments`, requestOptions);
}

async function UpdateBookingEquipment(data: BookingEquipmentInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/bookingequipments`, requestOptions);
}

async function DeleteBookingEquipmentID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/bookingequipments/${id}`, requestOptions);
}

export { GetBookingEquipment, GetBookingEquipmentId, CreateBookingEquipment, UpdateBookingEquipment, DeleteBookingEquipmentID };
