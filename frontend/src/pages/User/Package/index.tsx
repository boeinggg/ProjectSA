import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../../../components/payment/Card";
import myImage from "../../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import "../../../App.css";

interface PackageData {
    name: string;
    price: string;
    description: string;
    duration: string;
    aosDelay: string;
}

const packageData: PackageData[] = [
    {
        name: "Daily",
        price: "59THB/d.",
        description: "Members can access all services within the fitness center for a full day.",
        duration: "1 day",
        aosDelay: "100",
    },
    {
        name: "Monthly",
        price: "499THB/m.",
        description: "Members can access all services within the fitness center an unlimited number of times for one month.",
        duration: "1 month",
        aosDelay: "300",
    },
    {
        name: "Yearly",
        price: "1999THB/yr.",
        description: "Members can access all services within the fitness center an unlimited number of times for a full year.",
        duration: "1 year",
        aosDelay: "500",
    },
];

const Package: React.FC = () => {
    const navigate = useNavigate();

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const handlePurchase = (pkg: PackageData) => {
        navigate("/payment", { state: { packageData: pkg } });
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white">
            {/* Header Section */}
            <div className="bg-cover bg-center h-96 w-full flex items-center justify-center" style={{ backgroundImage: `url(${myImage})` }}>
                {/* Add content here if needed */}
            </div>
            <div className="text-center text-5xl font-bold mt-8">Our Fitness Pass</div>

            {/* Packages Section */}
            <div className="container mx-auto py-12 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {packageData.map((pkg) => (
                        <Card
                            key={pkg.name}
                            name={pkg.name}
                            price={pkg.price}
                            description={pkg.description}
                            duration={pkg.duration}
                            aosDelay={pkg.aosDelay}
                            onPurchase={() => handlePurchase(pkg)} // Add click handler
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Package;
