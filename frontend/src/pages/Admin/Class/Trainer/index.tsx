import { useState, useEffect } from "react";
import "../../../../App.css";
import SideBar from "../../../../components/admin/class/SideBar";
import Navbar from "../../../../components/admin/class/Navbar";
import Input from "../../../../components/admin/class/Input";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { CreateTrainer, GetTrainers, DeleteTrainerByID, UpdateTrainer } from "../../../../services/https/class/trainer";

// Modal Component
const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    title: string;
    type?: "delete" | "create" | "edit";
    trainerName?: string;
    trainer?: TrainersInterface | null;
    fetchTrainers?: () => void;
}> = ({ isOpen, onClose, onDelete, onSave, title, type = "create", trainer, trainerName, fetchTrainers }) => {
    const [name, setName] = useState(trainer?.Name || "");

    useEffect(() => {
        if (trainer) {
            setName(trainer.Name || "");
        }
    }, [trainer]);

    const handleSubmit = async () => {
        if (type === "create") {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: TrainersInterface = { Name: name };
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
                success: "Add trainer successfully!",
                error: "Failed to add trainer.",
            });

            try {
                await createTrainerPromise;
                setName("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error creating class type:", error);
            }
        } else if (type === "edit" && trainer && onSave) {
            if (!name) {
                toast.error("Please enter a name.");
                return;
            }
            const data: TrainersInterface = { ID: trainer.ID, Name: name };
            const editTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await UpdateTrainer(data);
                        resolve("Updated trainer successfully!");
                    } catch {
                        reject("Failed to update Trainer.");
                    }
                }, 1000);
            });

            toast.promise(editTrainerPromise, {
                loading: "Updating Trainer...",
                success: "Updated trainer successfully!",
                error: "Failed to update Trainer.",
            });

            try {
                await editTrainerPromise;
                setName("");
                onClose();
                if (fetchTrainers) fetchTrainers();
            } catch (error) {
                console.error("Error updating:", error);
            }
        } else if (type === "delete" && onDelete) {
            try {
                await onDelete();
                onClose();
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/4 flex flex-col justify-center ">
                <h2 className="text-xl font-bold mb-4 text-black flex justify-center ">{title}</h2>
                {type !== "delete" ? (
                    <>
                        <p className="flex flex-col justify-center items-center">
                            <label className="text-black  text-lg">Name</label>
                            <Input placeholder="Enter Name here" value={name} onChange={(e) => setName(e.target.value)} />
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-rose-500 text-black px-4 py-2 rounded-lg hover:bg-rose-600 hover:text-white"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green3 text-black px-4 py-2 rounded-lg hover:bg-green5 hover:text-white"
                                onClick={handleSubmit}
                            >
                                {type === "create" ? "Save" : "Update"}
                            </button>
                        </div>
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

// Trainer Component
const Trainer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState<number | null>(null);
    const [trainerNameToDelete, setTrainerNameToDelete] = useState<string>("");

    const [trainerToEdit, setTrainerToEdit] = useState<TrainersInterface | null>(null);

    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [name, setName] = useState(""); // Added state to handle name

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (trainer: TrainersInterface) => {
        setTrainerToEdit(trainer);
        setName(trainer.Name || ""); // Initialize name for editing
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const openDeleteModal = (id: number, name: string) => {
        setTrainerToDelete(id);
        setTrainerNameToDelete(name);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    // Delete handler
    const handleDelete = async () => {
        if (trainerToDelete !== null) {
            const deleteTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await DeleteTrainerByID(trainerToDelete);
                        resolve("Delete trainer successfully.");
                    } catch {
                        reject("Failed to delete trainer.");
                    }
                }, 1000);
            });

            toast.promise(deleteTrainerPromise, {
                loading: "Deleting...",
                success: <b>Trainer "{trainerNameToDelete}" has been deleted successfully.</b>,
                error: <b>Failed to delete.</b>,
            });

            try {
                await deleteTrainerPromise;
                fetchTrainers();
            } finally {
                closeDeleteModal();
            }
        }
    };

    const handleSave = async () => {
        if (trainerToEdit) {
            const data: TrainersInterface = {
                ID: trainerToEdit.ID,
                Name: name, // Make sure 'name' is the updated name from the modal
            };

            const updateTrainerPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await UpdateTrainer(data);
                        resolve("Updated trainer successfully!");
                    } catch {
                        reject("Failed to update trainer.");
                    }
                }, 1000);
            });

            toast.promise(updateTrainerPromise, {
                loading: "Updating...",
                success: "Updated trainer successfully!",
                error: "Failed to update trainer..",
            });

            try {
                await updateTrainerPromise;
                setTrainerToEdit(null); // Clear the classTypeToEdit
                closeEditModal();
                fetchTrainers(); // Refresh the class types list
            } catch (error) {
                console.error("Error updating trainer:", error);
            }
        }
    };

    // Fetch class types
    const fetchTrainers = async () => {
        try {
            const res = await GetTrainers();
            if (res) {
                setTrainers(res);
            }
        } catch (error) {
            console.error("Failed to fetch trainers", error);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleEdit = (trainer: TrainersInterface) => {
        openEditModal(trainer);
    };

    return (
        <div className="flex">
            <SideBar />
            <div className=" bg-black w-full h-screen">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <h1 className="text-3xl text-green1 ml-14 mt-2">Trainer</h1>
                        <div className="ml-auto mr-14 mt-2">
                            <button
                                className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg"
                                onClick={openModal}
                            >
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                    <div className="text-white bg-black flex justify-center">
                        <div className="w-[700px] h-[490px] items-center bg-gray4 rounded-xl mt-6 overflow-auto scrollable-div">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left">
                                        <th className="border-b p-2 w-1/6"></th>
                                        <th className="border-b p-2 w-1/2">Name</th>
                                        <th className="border-b p-2 w-1/3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trainers.map((trainer, index) => (
                                        <tr key={trainer.ID}>
                                            <td className="border-b p-2 text-center">{index + 1}</td>
                                            <td className="border-b p-2">{trainer.Name}</td>
                                            <td className="border-b p-2">
                                                <button
                                                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                                                    onClick={() => handleEdit(trainer)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
                                                    onClick={() => openDeleteModal(trainer.ID!, trainer.Name ?? "Unnamed Class Type")}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Toaster />
                        </div>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Class Type" fetchTrainers={fetchTrainers} />
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={handleSave} // Pass handleSave to onSave
                    title="Edit Class Type"
                    type="edit"
                    trainer={trainerToEdit}
                    fetchTrainers={fetchTrainers}
                />

                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                    title="Confirm Delete"
                    type="delete"
                    trainerName={trainerNameToDelete}
                />
            </div>
        </div>
    );
};

export default Trainer;
