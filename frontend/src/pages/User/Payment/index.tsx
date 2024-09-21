import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentMethod from "../../../components/payment/PaymentMethod";
import PackageDetails from "../../../components/payment/PaymentDetails";
import PaymentSuccess from "../../../components/payment/PaymentSuccess";
import myImage from "../../../assets/bg.jpg";

const Payment: React.FC = () => {
    const location = useLocation();
    const selectedPackage = location.state?.package;

    const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
    const [paymentComplete, setPaymentComplete] = useState<boolean>(false);

    const handlePayment = () => {
        setPaymentComplete(true); // Update the state to show the success message
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
                <PackageDetails packageInfo={selectedPackage} onPaymentClick={handlePayment} />
            </div>
        </div>
    );
};

export default Payment;
