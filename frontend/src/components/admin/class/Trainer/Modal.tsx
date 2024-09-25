import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Dropzone from "./Dropzone"; // นำเข้า Dropzone ของคุณเอง
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { CreateTrainer, UpdateTrainer } from "../../../../services/https/class/trainer";
import TrainerForm from "./TrainerForm";
import imageCompression from "browser-image-compression"; // นำเข้า imageCompression

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    title: string;
    type?: "delete" | "create" | "edit";
    trainerName?: string;
    trainer?: TrainersInterface | null;
    fetchTrainers?: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    onSave,
    title,
    type = "create",
    trainer,
    trainerName,
    fetchTrainers,
}) => {
    const [name, setName] = useState(trainer?.Name || "");
    const [trainerPicURL, setTrainerPicURL] = useState<string>("");

    useEffect(() => {
        if (trainer) {
            setName(trainer.Name || "");
            setTrainerPicURL(trainer.TrainerPic || ""); // Assuming trainer has a PicURL field
        }
    }, [trainer]);

    const closeModal = () => {
        setName(""); // รีเซ็ตชื่อ
        setTrainerPicURL(""); // รีเซ็ต URL รูปภาพ
        onClose(); // เรียกใช้งาน onClose ที่ส่งมา
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            // Compress the image before saving
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);

                // Convert compressed file to Base64
                const base64 = await getBase64(compressedFile);
                setTrainerPicURL(base64); // Set the Base64 URL for preview
            } catch (error) {
                console.error("Error compressing the file:", error);
                toast.error("Failed to compress the image.");
            }
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        if (type === "create") {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            if (!trainerPicURL) {
                toast.error("Please Drop a picture.");
                return;
            }

            const data: TrainersInterface = { Name: name, TrainerPic: trainerPicURL }; // Use Base64 trainerPicURL

            const createTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await CreateTrainer(data);
                        resolve("Add trainer successfully!");
                    } catch {
                        reject("Failed to add trainer.");
                    }
                }, 1000);
            });

            toast.promise(createTrainerPromise, {
                loading: "Adding trainer...",
                success: "Trainer added successfully!",
                error: "Failed to add trainer.",
            });

            try {
                await createTrainerPromise;
                setName("");
                setTrainerPicURL("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error creating trainer:", error);
            }
        } else if (type === "edit" && trainer && onSave) {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            if (!trainerPicURL) {
                toast.error("Please Drop a picture.");
                return;
            }

            const data: TrainersInterface = { ID: trainer.ID, Name: name, TrainerPic: trainerPicURL }; // Use Base64 trainerPicURL for edit

            const editTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await UpdateTrainer(data);
                        resolve("Updated trainer successfully!");
                    } catch {
                        reject("Failed to update trainer.");
                    }
                }, 1000);
            });

            toast.promise(editTrainerPromise, {
                loading: "Updating Trainer...",
                success: "Trainer updated successfully!",
                error: "Failed to update Trainer.",
            });

            try {
                await editTrainerPromise;
                setName("");
                setTrainerPicURL("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error updating trainer:", error);
            }
        } else if (type === "delete" && onDelete) {
            try {
                await onDelete();
                onClose();
            } catch (error) {
                console.error("Error deleting trainer:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/4 flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-4 text-black flex justify-center">{title}</h2>
                {type !== "delete" ? (
                    <>
                        <div className="flex justify-center mb-4">
                            {" "}
                            {/* Center the Dropzone */}
                            <Dropzone trainerPicURL={trainerPicURL} onDrop={handleDrop} />
                        </div>
                        <TrainerForm trainer={trainer} name={name} setName={setName} onSubmit={handleSubmit} onClose={closeModal} />
                    </>
                ) : (
                    <>
                        <p className="text-black flex justify-center">Are you sure you want to delete "{trainerName}"?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-green5 hover:text-white"
                                onClick={handleSubmit}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
