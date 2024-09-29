import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState, useEffect } from "react";

import Sidebar from "../../../components/booking/Sidebar";
// ฟังก์ชันที่ใช้ดึงข้อมูลอุปกรณ์

import EquipmentCard, { Equipment } from "../../../components/admin/bookingequipment/EquipmentCard";
import { GetEquipment } from "../../../services/https/equipment";
import Navbar from "../../../components/admin/class/Navbar";

// Extend dayjs to use timezone
dayjs.extend(utc);
dayjs.extend(timezone);

interface EquipmentData {
    ID: number;
    Name: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    EquipmentPic: string;
}

const EquipmentBooking: React.FC = () => {
    const [equipment, setEquipment] = useState<EquipmentData[]>([]);

    const fetchEquipment = async () => {
        try {
            const res = await GetEquipment(); // ฟังก์ชันในการดึงข้อมูลอุปกรณ์
            if (res) {
                setEquipment(res);
            }
        } catch (error) {
            console.error("Failed to fetch equipment", error);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    // Convert EquipmentData to Equipment
    const mapToEquipment = (equipmentData: EquipmentData): Equipment => ({
        id: equipmentData.ID,
        name: equipmentData.Name,
        description: equipmentData.Description,
        date: equipmentData.StartDate,
        time: equipmentData.EndDate,
        image: equipmentData.EquipmentPic,
        // You can add other properties as needed
    });

    return (
        <div className="flex">
            <Sidebar />
            <div className="bg-black w-full">
                <Navbar title={"Equipment Booking"} /> {/* เปลี่ยนชื่อเป็น Equipment Booking */}
                <div className="grid gap-4 grid-cols-2 p-4">
                    {equipment.map((equip) => (
                        <EquipmentCard
                            key={equip.ID}
                            equipment={mapToEquipment(equip)}
                            // Pass member data (can be null, handle it inside EquipmentCard)
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentBooking;
