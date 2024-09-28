import React, { useState, useEffect } from "react";
import { GetAdmins, DeleteAdminByID } from "../../../services/https/admin"; // Assume DeleteAdminByID exists
import { AdminsInterface } from "../../../interfaces/IAdmin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // For showing notifications

const TableList: React.FC = () => {
    const [Admins, setAdmins] = useState<AdminsInterface[]>([]);
    const navigate = useNavigate();
    const adminID = localStorage.getItem("id"); // Get logged-in admin ID from localStorage

    // Fetch admin data on component mount
    useEffect(() => {
        const getAdmins = async () => {
            const res = await GetAdmins();
            if (res) {
                setAdmins(res);
            }
        };
        getAdmins();
    }, []);

    // Handle delete admin
    const handleDelete = (id: number) => {
        if (id.toString() === adminID) {
            toast.error("You cannot delete your own account!");
            return; // Prevent the deletion if it's the logged-in admin
        }

        toast.promise(
            DeleteAdminByID(id) // Call the API to delete the admin by ID
                .then(() => {
                    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.ID !== id)); // Remove admin from the list
                }),
            {
                loading: "Deleting admin...",
                success: "Admin deleted successfully!",
                error: "Failed to delete admin.",
            }
        );
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-[1000px] text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-green2 dark:text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            First name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Admins.length > 0 ? (
                        Admins.map((admin, index) => (
                            <tr
                                key={admin.ID || index}
                                className="odd:bg-white odd:dark:bg-gray4 even:bg-gray-50 even:dark:bg-gray3 border-b dark:border-white"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {admin.FirstName}
                                </th>
                                <td className="px-6 py-3">{admin.LastName}</td>
                                <td className="px-6 py-3">{admin.Username}</td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3 flex gap-4">
                                    <button
                                        className="text-green2"
                                        onClick={() => {
                                            if (admin.ID) {
                                                navigate(`/EditAdmin/${admin.ID}`);
                                            }
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-rose-600"
                                        onClick={() => {
                                            if (admin.ID && window.confirm(`Are you sure you want to delete ${admin.FirstName}?`)) {
                                                handleDelete(admin.ID); // Pass the admin ID for deletion
                                            }
                                        }}
                                        disabled={admin.ID?.toString() === adminID} // Disable button for own ID
                                        title={admin.ID?.toString() === adminID ? "You cannot delete your own account" : ""}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center px-6 py-4">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableList;
