import React, { useState, useEffect } from "react";
import { UpdateAdmin, GetGenders } from "../../../services/https/admin";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AdminsInterface } from "../../../interfaces/IAdmin";
import { GendersInterface } from "../../../interfaces/IGender";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";

interface EditAdminFormProps {
    adminData?: AdminsInterface;
}

const EditForm: React.FC<EditAdminFormProps> = ({ adminData }) => {
    const [formData, setFormData] = useState<AdminsInterface>({
        FirstName: "",
        LastName: "",
        GenderID: undefined,
        Email: "",
        Username: "",
        Password: "",
    });

    const [genders, setGenders] = useState<GendersInterface[]>([]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await GetGenders();

                if (Array.isArray(response)) {
                    setGenders(response);
                } else {
                    console.error("Invalid data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching genders:", error);
            }
        };

        fetchGenders();
    }, []);

    useEffect(() => {
        if (adminData) {
            setFormData({
                FirstName: adminData.FirstName,
                LastName: adminData.LastName,
                GenderID: adminData.GenderID,
                Email: adminData.Email,
                Username: adminData.Username,
                Password: adminData.Password,
            });
        }
    }, [adminData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: keyof AdminsInterface
    ) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminData) {
            return;
        }

        try {
            if (formData) {
                console.log(formData);
                formData.GenderID = Number(formData.GenderID);
                await UpdateAdmin({ ...formData, ID: adminData.ID });
                toast.success("Updated admin successfully!");
            } else {
                // Uncomment if you need to handle creation of admin
                // await CreateAdmin(adminDataToSubmit);
                // toast.success("Admin created successfully!");
            }
            navigate("/ListAdmin");
        } catch (error) {
            toast.error("Failed to submit admin");
            console.error("Error submitting admin:", error);
        }
    };

    return (
        <div className="text-xl">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-green1 mb-2">First Name</label>
                        <input
                            type="text"
                            required
                            placeholder="First Name"
                            value={formData.FirstName}
                            onChange={(e) => handleInputChange(e, "FirstName")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-green1 mb-2">Last Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Last Name"
                            value={formData.LastName}
                            onChange={(e) => handleInputChange(e, "LastName")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-green1 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={formData.Email}
                            onChange={(e) => handleInputChange(e, "Email")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-green1 mb-2">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            required
                            autoComplete="gender"
                            value={formData.GenderID} // This will reflect the GenderID from formData
                            onChange={(e) => handleInputChange(e, "GenderID")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        >
                            <option value="">none</option>
                            {genders.map((gender) => (
                                <option key={gender.ID} value={gender.ID}>
                                    {gender.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-green1 mb-2">Username</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter username"
                            value={formData.Username}
                            onChange={(e) => handleInputChange(e, "Username")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-green1 mb-2">Password</label>
                        <input
                            type={isPasswordVisible ? "text" : "password"} // Change input type based on visibility state
                            required
                            placeholder="Enter new password"
                            value={formData.Password}
                            onChange={(e) => handleInputChange(e, "Password")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility} // Toggle visibility on click
                            className="absolute mt-3 right-3 text-green1" // Adjust positioning and styling as needed
                        >
                            {isPasswordVisible ? <CiUnlock/> : <CiLock/>} {/* Use appropriate icons */}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <button type="submit" className="bg-green5 text-white py-2 px-6 rounded-lg focus:outline-none hover:bg-green-500">
                        Update
                    </button>
                </div>
                {/* Buttons */}
            </form>
            <Toaster />
        </div>
    );
};

export default EditForm;
