import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentMethod from "../../../components/payment/PaymentMethod";
import PackageDetails from "../../../components/payment/PaymentDetails";
import PaymentSuccess from "../../../components/payment/PaymentSuccess";
import myImage from "../../../assets/bg.jpg";
import { PaymentInterface } from "../../../interfaces/IPayment";
import { CreatePayment } from "../../../services/https/payment";

const Payment: React.FC = () => {
    const location = useLocation();
    const selectedPackage = location.state?.package;

    const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
    const [paymentComplete, setPaymentComplete] = useState<boolean>(false);

    // Handle payment
    const handlePayment = async () => {
        const memberId = localStorage.getItem("id"); // Retrieve Member ID from localStorage

        if (!memberId || !selectedPackage) {
            console.error("Missing Member ID or Package information.");
            alert("Error: Missing member or package information.");
            return;
        }

        const paymentData: PaymentInterface = {
            PaymentMethodName: paymentMethod, // Either 'Credit Card' or 'PromptPay'
            Amount: Number(selectedPackage.Price), // Convert price to number
            MemberID: Number(memberId), // Convert Member ID to number
            PackageID: selectedPackage.ID, // Use Package ID from selected package
        };
        console.log("Payment Data:", paymentData);


        try {
            const response = await CreatePayment(paymentData);
            console.log("Payment Response:", response);

            if (response) {
                setPaymentComplete(true); // Mark payment as complete if successful
            } else {
                console.error("Payment creation failed.");
                alert("Failed to process payment. Please try again.");
            }
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Error during payment processing.");
        }
    };

    if (paymentComplete) {
        return <PaymentSuccess />;
    }

    return (
        <div className="bg-cover min-h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url(${myImage})` }}>
            <div className="flex flex-col md:flex-row h-[600px] bg-gray-900 p-12 rounded-2xl shadow-xl w-full md:w-3/4">
                {/* Payment Method Section */}
                <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

                {/* Package Details Section */}
                {selectedPackage ? (
                    <PackageDetails packageInfo={selectedPackage} onPaymentClick={handlePayment} />
                ) : (
                    <p className="text-white">No package information available.</p>
                )}
            </div>
        </div>
    );
};

export default Payment;
