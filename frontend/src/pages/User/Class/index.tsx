import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState, useEffect } from "react";
import Navbar from "../../../components/admin/class/Navbar";
import { GetClasses } from "../../../services/https/class";
import Sidebar from "../../../components/booking/Sidebar";
import FitnessClassCard, { FitnessClass } from "../../../components/booking/FitnessClassCard";

// Extend dayjs to use timezone
dayjs.extend(utc);
dayjs.extend(timezone);

interface ClassType {
    ID: number;
    Name: string;
}

interface Trainer {
    ID: number;
    Name: string;
}

interface ClassData {
    ID: number;
    ClassName: string;
    ClassPic: string;
    Deets: string;
    StartDate: string;
    EndDate: string;
    Trainer: Trainer;
    ParticNum: number;
    ClassType: ClassType;
}
const ClassBooking: React.FC = () => {
    const [classes, setClasses] = useState<ClassData[]>([]);

    const fetchClasses = async () => {
        try {
            const res = await GetClasses();
            if (res) {
                setClasses(res);
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    // Convert ClassData to FitnessClass
    const mapToFitnessClass = (classData: ClassData): FitnessClass => ({
        id: classData.ID,
        name: classData.ClassName,
        type: classData.ClassType.Name,
        description: classData.Deets,
        date: classData.StartDate,
        time: classData.EndDate,
        coach: classData.Trainer.Name,
        image: classData.ClassPic,
        maxParticipants: 40, // You can update this to match your data
        currentParticipants: classData.ParticNum,
    });

    return (
        <div className="flex">
            <Sidebar />
            <div className="bg-black w-full">
                <Navbar title={"ClassBooking"} />
                <div className="grid gap-4 grid-cols-2 p-4">
                    {classes.map((fitnessClass) => (
                        <FitnessClassCard
                            key={fitnessClass.ID}
                            fitnessClass={mapToFitnessClass(fitnessClass)}
                            // Pass member data (can be null, handle it inside FitnessClassCard)
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassBooking;
