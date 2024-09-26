import React, { useState } from "react";

const CreatePackageForm: React.FC = () => {
    const [formData, setFormData] = useState({
        PackageName: "",
        Description: "",
        Price: "",
        Duration: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        field: keyof typeof formData
    ) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className=" max-w-7xl mx-auto p-12 bg-gray-800 rounded-lg shadow-lg mt-6">
            
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Package Name */}
                    <div>
                        <label className="block text-green-400 mb-2 text-3xl">Package Name</label>
                        <input
                            id="PackageName"
                            name="PackageName"
                            type="text"
                            required
                            placeholder="Enter package name"
                            value={formData.PackageName}
                            onChange={(e) => handleInputChange(e, "PackageName")}
                            className="w-full p-3  text-black text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-green-400 mb-2 text-3xl">Price</label>
                        <input
                            id="Price"
                            name="Price"
                            type="string"
                            required
                            placeholder="Enter price"
                            value={formData.Price}
                            onChange={(e) => handleInputChange(e, "Price")}
                            className="w-full p-3 bg-white text-black text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-green-400 mb-2 text-3xl">Description</label>
                        <textarea
                            id="Description"
                            name="Description"
                            required
                            placeholder="Enter description"
                            value={formData.Description}
                            onChange={(e) => handleInputChange(e, "Description")}
                            className="w-full p-3 bg-white text-black text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 h-32"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-green-400 mb-2 text-3xl">Duration</label>
                        <select
                            id="Duration"
                            name="Duration"
                            required
                            value={formData.Duration}
                            onChange={(e) => handleInputChange(e, "Duration")}
                            className="w-full p-3  text-black text-2xl rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            <option value="">Select duration</option>
                            <option value="daily">1 Day</option>
                            <option value="monthly">1 Month</option>
                            <option value="yearly">1 Year</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        type="button"
                        className="bg-red hover:bg-rose-500 text-black font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out text-2xl"
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="bg-green-400 hover:bg-green-500 text-black font-semibold py-4 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out text-2xl"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePackageForm;