import React, { useState } from "react";

const Stepper: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        step1: "",
        step2: "",
        step3: "",
    });

    const steps = ["Personal Info", "Contact", "Account Info"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [`step${currentStep}`]: e.target.value,
        });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Firstname</div>
                            <input
                                id="Firstname"
                                name="Firstname"
                                type="Firstname"
                                required
                                autoComplete="Firstname"
                                className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white shadow-sm  "
                                placeholder="Enter firstname"
                            />
                            <div className="mt-2">
                                <div className="text-xs text-left mb-2 xl:text-lg text-white">Lastname</div>
                                <input
                                    id="Lastname"
                                    name="Lastname"
                                    type="Lastname"
                                    required
                                    autoComplete="Lastname"
                                    className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white shadow-sm  "
                                    placeholder="Enter lastname"
                                />
                            </div>

                            <div>
                                <form className="max-w-sm mx-auto mt-8 ">
                                    <label htmlFor="underline_select" className="sr-only">
                                        Underline select
                                    </label>
                                    <select
                                        id="underline_select"
                                        className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white"
                                    >
                                        <option selected>Choose a gender</option>
                                        <option value="US">Female</option>
                                        <option value="CA">Male</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2  xl:text-lg text-white">Phone Number</div>
                            <input
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type="PhoneNumber"
                                required
                                autoComplete="PhoneNumber"
                                className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white shadow-sm  "
                                placeholder="Enter Phone Number"
                            />
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Email</div>
                            <input
                                id="Email"
                                name="Email"
                                type="Email"
                                required
                                autoComplete="Email"
                                className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white shadow-sm  "
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white">Username</div>
                            <input
                                id="Username"
                                name="Username"
                                type="Username"
                                required
                                autoComplete="Username"
                                className="block w-full rounded-full  text-center bg-gray5 py-3 text-white shadow-sm  "
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-left mb-2 xl:text-lg text-white ">Password</div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="password"
                                className="block w-full rounded-full  text-center  bg-gray5 py-3 text-white shadow-sm  "
                                placeholder="Enter password"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-md mx-auto ">
            <div className="flex justify-between mb-10">
                {steps.map((step, index) => (
                    <div key={index} className={`relative flex-1 text-center ${index + 1 <= currentStep ? "text-hover" : "text-white"}`}>
                        <div
                            className={`absolute inset-x-0 top-1/2 transform -translate-y-1/2 ${
                                index + 1 < currentStep ? "border-green5" : "border-gray-300"
                            }`}
                        ></div>
                        <div
                            className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full border ${
                                index + 1 <= currentStep ? "border-green5 bg-green5 text-white" : "border-gray-300"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <p className="mt-2 text-white">{step}</p>
                    </div>
                ))}
            </div>
            <div className="mb-[5px]">{renderStepContent()}</div>
            <div className="flex justify-between mt-10">
                <button
                    onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
                    className="px-4 py-2 bg-green5 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Stepper;
