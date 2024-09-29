import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { BookingEquipmentInterface } from "../../../interfaces/IBookingEquipment";
import { CreateBookingEquipment, DeleteBookingEquipmentID } from "../../../services/https/bookingequipment";



dayjs.extend(utc);
dayjs.extend(timezone);

interface EquipmentCardProps {
    equipment: Equipment;
}

export interface Equipment {
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    image: string;
    onBooking?: () => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
    const { id, name, description, date, time, image, onBooking } = equipment;

    const [hasBooked, setHasBooked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const currDate = new Date();
    const idm = localStorage.getItem("id");

    // Handle booking equipment
    const handleBook = async () => {
        const memberId = idm ? parseInt(idm, 10) : null;

        if (memberId === null) {
            toast.error("Member information is missing. Please log in.");
            return;
        }

        const data: BookingEquipmentInterface = {
            DateBooking: currDate,
            EquipmentID: id,
            MemberID: memberId,
        };

        setLoading(true);
        try {
            const response = await CreateBookingEquipment(data);
            console.log("API response:", response);

            if (response) {
                setHasBooked(true);
                toast.success("Successfully booked the equipment!");
                if (onBooking) {
                    onBooking();
                }
            } else {
                toast.error("Failed to book the equipment. Please try again.");
            }
        } catch (error) {
            console.error("Error booking the equipment:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Handle cancel booking
    const handleCancel = async () => {
        const memberId = idm ? parseInt(idm, 10) : null;

        if (!memberId) {
            toast.error("Member information is missing. Please log in.");
            return;
        }

        if (hasBooked) {
            setLoading(true);
            try {
                const response = await DeleteBookingEquipmentID(id);
                console.log("API response:", response);

                if (response) {
                    setHasBooked(false);
                    toast.success("Successfully canceled the booking!");
                    if (onBooking) {
                        onBooking();
                    }
                } else {
                    toast.error("Failed to cancel the booking. Please try again.");
                }
            } catch (error) {
                console.error("Error canceling the booking:", error);
                toast.error("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("You have not booked this equipment.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden ml-4 max-h-80">
            <img src={image} alt={name} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
            <div className="p-4 flex flex-col justify-center items-center w-full md:w-2/3 text-center bg-sidebar">
                <h2 className="text-xl md:text-2xl text-iconUser">{name}</h2>
                <p className="text-iconUser">{description}</p>
                <div className="text-iconUser mt-2">
                    <p>{dayjs.tz(date, "Asia/Bangkok").format("D MMM YYYY")}</p>
                    <p>
                        {dayjs.tz(time, "Asia/Bangkok").format("HH:mm")} - {dayjs.tz(time, "Asia/Bangkok").format("HH:mm")}
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4">
                    {!hasBooked ? (
                        <button className="px-4 py-2 rounded bg-hover hover:bg-hover text-white" onClick={handleBook} disabled={loading}>
                            {loading ? "Processing..." : "Book"}
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Cancel"}
                        </button>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default EquipmentCard;
