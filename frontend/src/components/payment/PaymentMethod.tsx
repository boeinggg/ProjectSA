import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PaymentMethodProps {
    selectedMethod: string;
    onMethodChange: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onMethodChange }) => {
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg flex-1 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">Select Payment Method</h2>

            <div className="flex justify-start mb-4 space-x-4">
                <button
                    className={`py-4 px-6 rounded-md shadow-md focus:outline-none ${
                        selectedMethod === "Credit Card" ? "bg-lime-400 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => onMethodChange("Credit Card")}
                >
                    Credit Card
                </button>
                <button
                    className={`py-4 px-6 rounded-md shadow-md focus:outline-none ${
                        selectedMethod === "PayPal" ? "bg-lime-400 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => onMethodChange("PayPal")}
                >
                    PayPal
                </button>
            </div>

            {selectedMethod === "Credit Card" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cardHolder">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="cardHolder"
                            className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="Enter card holder name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cardNumber">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="0000 - 0000 - 0000 - 0000"
                        />
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="w-1/2 mr-4">
                            <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="expiryDate">
                                Expiry Date
                            </label>
                            <DatePicker
                                selected={expiryDate}
                                onChange={(date: Date | null) => setExpiryDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            />
                        </div>
                        <div className="w-1/2 ml-4">
                            <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="cvvCode">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvvCode"
                                className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                                placeholder="CVV"
                            />
                        </div>
                    </div>
                </>
            )}

            {selectedMethod === "PayPal" && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="emailAddress">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="emailAddress"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="hello@example.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-3 rounded-2xl border border-gray-300 text-lg text-black"
                            placeholder="Enter your last name"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentMethod;
