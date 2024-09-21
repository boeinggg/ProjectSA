import React, { useState, useEffect } from "react";
import "../../../../App.css";
import SideBar from "../../../../components/admin/class/SideBar";
import Navbar from "../../../../components/admin/class/Navbar";
import Modal from "../../../../components/admin/class/Trainer/Modal";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { GetTrainers, DeleteTrainerByID, UpdateTrainer, CreateTrainer } from "../../../../services/https/class/trainer";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";

const Trainer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState<number | null>(null);
    const [trainerNameToDelete, setTrainerNameToDelete] = useState<string>("");

    const [trainerToEdit, setTrainerToEdit] = useState<TrainersInterface | null>(null);
    const [trainers, setTrainers] = useState<TrainersInterface[]>([]);
    const [name, setName] = useState("");

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

    const handleDelete = async () => {
        if (trainerToDelete !== null) {
            try {
                await DeleteTrainerByID(trainerToDelete);
                toast.success(`Trainer "${trainerNameToDelete}" has been deleted successfully.`);
                fetchTrainers();
            } catch {
                toast.error("Failed to delete trainer.");
            }
            closeDeleteModal();
        }
    };

    const handleSave = async () => {
        if (!name) {
            toast.error("Please enter a name.");
            return;
        }

        if (trainerToEdit) {
            // Update trainer
            const data: TrainersInterface = { ID: trainerToEdit.ID, Name: name };
            try {
                await UpdateTrainer(data);
                toast.success("Updated trainer successfully!");
                fetchTrainers();
                closeEditModal();
            } catch {
                toast.error("Failed to update trainer.");
            }
        } else {
            // Create new trainer
            const data: TrainersInterface = { Name: name };
            try {
                await CreateTrainer(data);
                toast.success("Added trainer successfully!");
                fetchTrainers();
                closeModal();
            } catch {
                toast.error("Failed to add trainer.");
            }
        }
    };

    const fetchTrainers = async () => {
        try {
            const res = await GetTrainers();
            if (res) setTrainers(res);
        } catch (error) {
            console.error("Failed to fetch trainers", error);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full h-screen">
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
                                                    onClick={() => openEditModal(trainer)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
                                                    onClick={() => openDeleteModal(trainer.ID!, trainer.Name ?? "Unnamed Trainer")}
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
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Create Trainer"
                    type="create"
                    fetchTrainers={fetchTrainers}
                    onSave={handleSave}
                />
                {isEditModalOpen && trainerToEdit && (
                    <Modal
                        isOpen={isEditModalOpen}
                        onClose={closeEditModal}
                        title="Edit Trainer"
                        type="edit"
                        trainer={trainerToEdit}
                        fetchTrainers={fetchTrainers}
                        onSave={handleSave}
                    />
                )}
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
