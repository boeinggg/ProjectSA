import React from "react";
import "../../../App.css";

const Card: React.FC<{
    name: string;
    price: string;
    duration: string;
    description: string;
    // aosDelay: string;
    // onPurchase: () => void; // Add onPurchase prop
}> = ({ name, price, duration, description }) => {
    return (
        <div
            // data-aos="fade-up"
            // data-aos-delay={aosDelay}
            className="border-2 border-green3 text-white p-12 rounded-2xl shadow-lg text-center w-full flex flex-col justify-between z-10" // Updated z-index
        >
            <h2 className="text-2xl font-semibold mb-4 bg-green4 rounded-full text-black">{name}</h2>
            <p className="text-3xl font-bold mb-4">{price}</p>
            <p className="text-xl mb-5">{description}</p>
            <p className="font-semibold text-lg mb-5">Duration: {duration}</p>
        </div>
    );
};

export default Card;
