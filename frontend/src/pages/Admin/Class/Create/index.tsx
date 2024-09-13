import "../../../../App.css";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import Dropzone from "../../../../components/admin/class/Dropzone";
import Label from "../../../../components/admin/class/Label";
import Input from "../../../../components/admin/class/Input";
import Select from "../../../../components/admin/class/Select";
import Textarea from "../../../../components/admin/class/Textarea";
import DateTimePicker from "../../../../components/admin/class/DateTimePicker";
import { FaRegSave } from "react-icons/fa";
import { CreateClass } from "../../../../services/https/class";
import { GetClassTypes } from "../../../../services/https/class/classType";
import { GetTrainers } from "../../../../services/https/class/trainer";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { ClassesInterface } from "../../../../interfaces/IClass";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import toast, { Toaster } from "react-hot-toast";

interface ModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    children: React.ReactNode;
    confirmLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, onOk, onCancel, title, children, confirmLoading = false }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                        onClick={onCancel}
                        disabled={confirmLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 bg-green3 text-white rounded hover:bg-green-600 ${
                            confirmLoading ? "bg-green3 cursor-not-allowed" : "bg-green-500"
                        }`}
                        onClick={onOk}
                        disabled={confirmLoading}
                    >
                        {confirmLoading ? "Saving..." : "OK"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ClassCreate: React.FC = () => {
    const [className, setClassName] = useState<string>("");
    const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>(1);

    const [selectedType, setSelectedType] = useState<number | undefined>(1);
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [classPic, setClassPic] = useState<string | undefined>(undefined);
    const [particNum, setParticNum] = useState<number | undefined>(undefined);

    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [classTypes, setClassTypes] = useState<ClassTypesInterface[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchClassTypes = async () => {
        try {
            const res = await GetClassTypes();
            if (res) {
                setClassTypes(res);
            } else {
                console.error("Failed to fetch class types");
            }
        } catch (error) {
            console.error("Failed to fetch ClassTypes", error);
        }
    };

    const fetchTrainers = async () => {
        try {
            const res = await GetTrainers();
            if (res) {
                setTrainers(res);
            } else {
                console.error("Failed to fetch class types");
            }
        } catch (error) {
            console.error("Failed to fetch ClassTypes", error);
        }
    };

    const handleSave = async () => {
        setConfirmLoading(true);
        const errors: string[] = [];

        if (!className) errors.push("Please enter the class name.");
        if (!classPic) errors.push("Please upload a class picture.");
        if (!selectedType) errors.push("Please select a class type.");
        if (!description) errors.push("Please enter a description.");
        if (!selectedTrainer) errors.push("Please select a trainer.");
        if (!startDate) errors.push("Please select a start date.");
        if (!endDate) errors.push("Please select an end date.");
        if (particNum === undefined) errors.push("Please enter the number of attendees.");

        // เช็ควันที่ว่าเป็นวันเดียวกันหรือไม่
        if (startDate && endDate) {
            const startDay = startDate.getDate();
            const startMonth = startDate.getMonth();
            const startYear = startDate.getFullYear();

            const endDay = endDate.getDate();
            const endMonth = endDate.getMonth();
            const endYear = endDate.getFullYear();

            // ตรวจสอบว่า วัน, เดือน, ปี ต้องตรงกัน
            if (startDay !== endDay || startMonth !== endMonth || startYear !== endYear) {
                errors.push("Start date and end date must be on the same day.");
            } else {
                // ตรวจสอบว่าเวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด
                const startTime = startDate.getTime();
                const endTime = endDate.getTime();

                if (startTime >= endTime) {
                    errors.push("Start time must be earlier than end time.");
                }
            }
        }

        if (errors.length > 0) {
            errors.forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error);
                }, index * 1000); // Delay between toasts (1000 ms = 1 second)
            });
            setConfirmLoading(false);
            return;
        }

        try {
            const newClass: ClassesInterface = {
                ClassName: className,
                Deets: description,
                TrainerID: selectedTrainer,
                ClassPic: classPic || "",
                ParticNum: particNum,
                StartDate: startDate ? new Date(startDate) : undefined,
                EndDate: endDate ? new Date(endDate) : undefined,
                ClassTypeID: selectedType,
                AdminID: 1,
            };

            console.log("Creating class with data:", newClass);

            const res = await CreateClass(newClass);
            if (res) {
                toast.success("Class created successfully!");
                navigate("/class");
            } else {
                toast.error("Failed to create class.");
            }
        } catch (error) {
            console.error("Error creating class:", error);
            toast.error("Failed to create class.");
        } finally {
            setConfirmLoading(false);
            setModalVisible(false);
        }
    };

    const showConfirmModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.9, // ขนาดสูงสุดของไฟล์ที่ต้องการ (900KB)
                    maxWidthOrHeight: 1024, // ขนาดสูงสุดของความกว้างหรือความสูง
                };

                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        const base64String = reader.result.toString().split(",")[1]; // ลบส่วนของ Data URL
                        setClassPic(base64String);
                    }
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing image:", error);
            }
        }
    };

    useEffect(() => {
        fetchClassTypes();
        fetchTrainers();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <h1 className="text-3xl text-secondary ml-14 mt-2">CREATE CLASS</h1>
                        <button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 ml-auto mr-14 shadow-md hover:shadow-lg"
                            onClick={showConfirmModal}
                        >
                            <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className=" flex flex-wrap justify-center">
                    <div className="bg-gray4  mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            <Dropzone onDrop={handleDrop} />
                            <div className="flex flex-col items-start ml-[40px]">
                                <Label text="Name" />
                                <Input placeholder="Enter Name here" value={className} onChange={(e) => setClassName(e.target.value)} />
                                <Select
                                    options={classTypes.map((type) => ({
                                        value: type.ID?.toString() || "", // Handle undefined by providing an empty string
                                        label: type.Name || "Unnamed", // Handle undefined names
                                    }))}
                                    value={selectedType?.toString() || ""} // Convert selectedType to string or use an empty string
                                    onChange={(value) => setSelectedType(value ? Number(value) : undefined)} // Convert string back to number or set to undefined
                                    label="Type"
                                />
                                <Label text="Description" />
                                <Textarea
                                    placeholder="Write description here"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Select
                                    options={trainers.map((trainer) => ({
                                        value: trainer.ID?.toString() || "", // Handle undefined by providing an empty string
                                        label: trainer.Name || "Unnamed", // Handle undefined names
                                    }))}
                                    value={selectedTrainer?.toString() || ""} // Convert selectedType to string or use an empty string
                                    onChange={(value) => setSelectedTrainer(value ? Number(value) : undefined)} // Convert string back to number or set to undefined
                                    label="Trainer"
                                />
                                <DateTimePicker
                                    selectedDate={startDate || new Date()} // Use a default Date if startDate is null
                                    onChange={(date) => setStartDate(date)}
                                    label="Start Date and Time:"
                                />
                                <DateTimePicker
                                    selectedDate={endDate || new Date()} // Use a default Date if endDate is null
                                    onChange={(date) => setEndDate(date)}
                                    label="End Date and Time:"
                                />

                                <Label text="No. of Attendees" />
                                <Input
                                    placeholder="Enter Number of Attendees here"
                                    value={particNum?.toString() || ""} // Convert number to string or use an empty string
                                    onChange={(e) => setParticNum(Number(e.target.value) || undefined)} // Convert string to number or set to undefined
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal title="Confirm Save" visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <p>Are you sure you want to Create this Class?</p>
            </Modal>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default ClassCreate;
