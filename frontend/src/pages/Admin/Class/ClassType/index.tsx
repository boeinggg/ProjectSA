import React, { useState, useEffect } from "react";
import Modal from "../../../../components/admin/class/Modal";
import ClassTypeTable from "../../../../components/admin/class/ClassTypeTable";
import SideBar from "../../../../components/admin/class/SideBar";
import Navbar from "../../../../components/admin/class/Navbar";
import { GrAddCircle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { GetClassTypes, DeleteClassTypesByID } from "../../../../services/https/class/classType";

const ClassType: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [classTypeToDelete, setClassTypeToDelete] = useState<number | null>(null);
    const [classTypeNameToDelete, setClassTypeNameToDelete] = useState<string>("");

    const [classTypeToEdit, setClassTypeToEdit] = useState<ClassTypesInterface | null>(null);

    const [classtypes, setClassTypes] = useState<ClassTypesInterface[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (classType: ClassTypesInterface) => {
        setClassTypeToEdit(classType);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const openDeleteModal = (id: number, name: string) => {
        setClassTypeToDelete(id);
        setClassTypeNameToDelete(name);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = async () => {
        if (classTypeToDelete !== null) {
            const deleteClassPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await DeleteClassTypesByID(classTypeToDelete);
                        resolve("Class deleted successfully.");
                    } catch {
                        reject("Failed to delete class.");
                    }
                }, 1000);
            });

            toast.promise(deleteClassPromise, {
                loading: "Deleting...",
                success: <b>Class "{classTypeNameToDelete}" has been deleted successfully.</b>,
                error: <b>Failed to delete class.</b>,
            });

            try {
                await deleteClassPromise;
                fetchClassTypes();
            } finally {
                closeDeleteModal();
            }
        }
    };

    const fetchClassTypes = async () => {
        try {
            const res = await GetClassTypes();
            if (res) {
                setClassTypes(res);
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    useEffect(() => {
        fetchClassTypes();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Class" />
                <div>
                    <div className="navbar bg-forth h-[76px] flex items-center">
                        <h1 className="text-3xl text-secondary ml-14 mt-2">Class Type</h1>
                        <div className="ml-auto mr-14 mt-2">
                            <button
                                className="text-primary font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg"
                                onClick={openModal}
                            >
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Create</span>
                            </button>
                        </div>
                    </div>
                    <div className="text-white bg-black overflow-auto h-[520px] scrollable-div flex justify-center">
                        <div className="w-[700px] h-[490px] bg-gray4 rounded-xl mt-6">
                            <ClassTypeTable classTypes={classtypes} onEdit={openEditModal} onDelete={openDeleteModal} />
                            <Toaster />
                        </div>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Class Type" fetchClassTypes={fetchClassTypes} />
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    title="Edit Class Type"
                    type="edit"
                    classType={classTypeToEdit}
                    fetchClassTypes={fetchClassTypes}
                />
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    title="Confirm Delete"
                    type="delete"
                    classTypeName={classTypeNameToDelete}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default ClassType;
