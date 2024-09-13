import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../.././../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import Dropzone from "../../../../components/admin/class/Dropzone";
import Label from "../../../../components/admin/class/Label";
import Input from "../../../../components/admin/class/Input";
import Select from "../../../../components/admin/class/Select";
import Textarea from "../../../../components/admin/class/Textarea";
import DateTimePicker from "../../../../components/admin/class/DateTimePicker";
import toast, { Toaster } from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
import { UpdateClass, GetClassById } from "../../../../services/https/class";
import { GetClassTypes } from "../../../../services/https/class/classType"
import {GetTrainers} from "../../../../services/https/class/trainer"
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { ClassesInterface } from "../../../../interfaces/IClass";
import imageCompression from "browser-image-compression";

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

const EditClass: React.FC = () => {
    const { classID } = useParams<{ classID: string }>();
    const navigate = useNavigate();
    const [className, setClassName] = useState<string>("");
    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<number | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [classPic, setClassPic] = useState<File | null>(null);
    const [classPicURL, setClassPicURL] = useState<string>("");
    const [particNum, setParticNum] = useState<number | undefined>(undefined);
    const [classTypes, setClassTypes] = useState<ClassTypesInterface[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const fetchClassTypes = useCallback(async () => {
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
    }, []);

    const fetchTrainers = useCallback(async () => {
        try {
            const res = await GetTrainers();
            if (res) {
                setTrainers(res);
            } else {
                console.error("Failed to fetch Trainers");
            }
        } catch (error) {
            console.error("Failed to fetch Trainer", error);
        }
    }, []);

    const fetchClassDetails = useCallback(async () => {
        try {
            if (!classID) return;
            const res = await GetClassById(Number(classID));
            if (res) {
                setClassName(res.ClassName || "");
                setSelectedTrainer(res.TrainerID);
                setSelectedType(res.ClassTypeID);
                setStartDate(res.StartDate ? new Date(res.StartDate) : null);
                setEndDate(res.EndDate ? new Date(res.EndDate) : null);
                setDescription(res.Deets || "");
                setClassPicURL(res.ClassPic || "");
                setParticNum(res.ParticNum || "");
            } else {
                console.error("Failed to fetch class details");
            }
        } catch (error) {
            console.error("Failed to fetch class details", error);
        }
    }, [classID]);

    const handleSave = async () => {
        setConfirmLoading(true);

        type UpdateClassResult = boolean;
        // Create a new promise with a delay
        const delayedUpdateClass = new Promise<UpdateClassResult>((resolve, reject) => {
            // Introduce a delay of 1 second (1000 milliseconds)
            const delay = 1000;

            setTimeout(async () => {
                try {
                    const updatedClass: ClassesInterface = {
                        ID: Number(classID),
                        ClassName: className,
                        Deets: description,
                        TrainerID: selectedTrainer,
                        ClassPic: classPic ? await getBase64(classPic) : classPicURL, // Use Base64 URL of the uploaded image
                        ParticNum: particNum,
                        StartDate: startDate ? new Date(startDate) : undefined, // Ensure this is a Date or undefined
                        EndDate: endDate ? new Date(endDate) : undefined,
                        ClassTypeID: selectedType,
                        AdminID: 1,
                    };

                    const res = await UpdateClass(updatedClass);
                    if (res) {
                        resolve(res);
                    } else {
                        reject(new Error("Failed to update class."));
                    }
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });

        toast.promise(delayedUpdateClass, {
            loading: "Updating class...",
            success: "Class updated successfully!",
            error: "Failed to update class.",
        });

        try {
            await delayedUpdateClass; // Await the delayed promise
            navigate("/class");
        } catch (error) {
            console.error("Error updating class:", error);
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
            // ตั้งค่าพารามิเตอร์สำหรับการบีบอัดภาพ
            const options = {
                maxSizeMB: 0.9, // ขนาดสูงสุดของไฟล์ที่ต้องการ (900KB)
                maxWidthOrHeight: 1024, // ขนาดสูงสุดของความกว้างหรือความสูง
                useWebWorker: true,
            };

            try {
                // ทำการบีบอัดภาพ
                const compressedFile = await imageCompression(file, options);

                // อ่านภาพที่ถูกบีบอัดแล้วและแสดงผล
                setClassPic(compressedFile);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setClassPicURL(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing file:", error);
            }
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        fetchClassTypes();
        fetchTrainers();
        fetchClassDetails();
    }, [fetchClassTypes, fetchTrainers, fetchClassDetails]);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <h1 className="text-3xl text-green1 ml-14 mt-5">EDIT CLASS</h1>
                        <button
                            className={`text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 ml-auto mr-14 shadow-md hover:shadow-lg ${
                                confirmLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={showConfirmModal}
                            disabled={confirmLoading}
                        >
                            <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className=" flex flex-wrap justify-center">
                    <div className="bg-gray4  mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex">
                            <div className="flex-1 m-8 j">
                                <Dropzone onDrop={handleDrop} classPicURL={classPicURL} />
                                <h1 className="text-mg text-green1 mt-2 flex justify-center ">Drag and drop or browse to upload</h1>
                            </div>
                            <div className="flex-1 pt-7">
                                <div className="flex flex-col items-start ml-[40px]">
                                    <Label text="Name" />
                                    <Input placeholder="Enter Name here" value={className} onChange={(e) => setClassName(e.target.value)} />
                                    <Select
                                        options={classTypes.map((type) => ({
                                            value: type.ID?.toString() || "",
                                            label: type.Name || "Unnamed",
                                        }))}
                                        value={selectedType?.toString() || ""}
                                        onChange={(value) => setSelectedType(value ? Number(value) : undefined)}
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
                                            value: trainer.ID?.toString() || "",
                                            label: trainer.Name || "Unnamed",
                                        }))}
                                        value={selectedTrainer?.toString() || ""}
                                        onChange={(value) => setSelectedTrainer(value ? Number(value) : undefined)}
                                        label="Trainer"
                                    />
                                    <DateTimePicker
                                        selectedDate={startDate || new Date()} // Default to current date if null
                                        onChange={(date) => setStartDate(date)}
                                        label="Start Date and Time:"
                                    />
                                    <DateTimePicker
                                        selectedDate={endDate || new Date()} // Default to current date if null
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
            </div>

            <Modal title="Confirm Save" visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <p>Are you sure you want to Update this class?</p>
            </Modal>
            <Toaster />
        </div>
    );
};

export default EditClass;
