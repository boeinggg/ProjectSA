import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AdminsInterface } from "../../../interfaces/IAdmin";
import { CreateAdmin, GetGenders } from "../../../services/https/admin"; // Import GetGenders
import { GendersInterface } from "../../../interfaces/IGender";

const AdminCreateForm: React.FC = () => {
    const [formData, setFormData] = useState<AdminsInterface>({
        FirstName: "",
        LastName: "",
        Username: "",
        Password: "",
        Email: "",
        GenderID: undefined,
    });

    const [genders, setGenders] = useState<GendersInterface[]>([]); // State to store gender options
    const navigate = useNavigate();

    // Fetch gender options when the component mounts
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

    // Handle input changes for form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof AdminsInterface) => {
        setFormData({
            ...formData,
            [field]: field === "GenderID" ? Number(e.target.value) : e.target.value, // Convert GenderID to number
        });
    };

    // Handle form submission to create a new admin
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            console.log("Form Data:", formData);
            const res = await CreateAdmin(formData); // Send formData to API

            // Check if the response is successful
            if (res && res.data) {
                toast.success("Successfully created admin!");
                setTimeout(() => navigate("/ListAdmin"), 600); // Redirect after success
            } else if (res.errors) {
                // Handle validation errors returned from the API
                toast.error(`Submission failed: ${res.errors.join(", ")}`);
                setTimeout(() => navigate("/CreateAdmin"), 600); // Reload create page after failure
            } else {
                toast.error("Submission failed, please try again.");
                setTimeout(() => navigate("/CreateAdmin"), 600); // Reload create page after failure
            }
        } catch (error) {
            console.error("Error saving data:", error); // Log the error
            toast.error("Error saving data. Please try again.");
            setTimeout(() => navigate("/CreateAdmin"), 600); // Reload create page after error
        }
    };

    return (
        <div className="text-xl">
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 ">
                    {/* First Name */}
                    <div>
                        <label className="block text-green1 mb-2 mt-6">First Name</label>
                        <input
                            id="FirstName"
                            name="FirstName"
                            type="text"
                            required
                            autoComplete="FirstName"
                            placeholder="First Name"
                            value={formData.FirstName}
                            onChange={(e) => handleInputChange(e, "FirstName")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-green1 mb-2 mt-6">Last Name</label>
                        <input
                            id="LastName"
                            name="LastName"
                            type="text"
                            required
                            autoComplete="LastName"
                            placeholder="Last Name"
                            value={formData.LastName}
                            onChange={(e) => handleInputChange(e, "LastName")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none "
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-green1 mb-2">Email</label>
                        <input
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            type="text"
                            placeholder="Enter your email"
                            value={formData.Email}
                            onChange={(e) => handleInputChange(e, "Email")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-green1 mb-2">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            required
                            autoComplete="gender"
                            value={formData.GenderID}
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
                            id="username"
                            name="username"
                            required
                            autoComplete="username"
                            type="text"
                            placeholder="Enter username"
                            value={formData.Username}
                            onChange={(e) => handleInputChange(e, "Username")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-green1 mb-2">Password</label>
                        <input
                            id="password"
                            name="password"
                            required
                            autoComplete="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.Password}
                            onChange={(e) => handleInputChange(e, "Password")}
                            className="w-full p-3 bg-gray5 text-white rounded focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <button type="submit" className="px-4 py-2 bg-green5 text-white rounded" aria-label="Confirm data submission">
                        Confirm Data
                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default AdminCreateForm;
