import React from "react";

interface PackageDetailsProps {
    packageInfo: { name: string; price: number; description: string };
    onPaymentClick: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageInfo, onPaymentClick }) => {
    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg flex-1 flex flex-col justify-between items-center text-center">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-white">{packageInfo?.name || "Package Name"}</h2>
                <p className="text-4xl font-extrabold mb-6 text-white">{packageInfo?.price ? `$${packageInfo.price}` : "Price"}</p>
                <p className="text-2xl text-white leading-relaxed">{packageInfo?.description || "Package Description"}</p>
            </div>

            <div className="mt-12">
                <button
                    onClick={onPaymentClick}
                    className="bg-lime-400 text-gray-900 font-semibold py-3 px-8 text-xl rounded-2xl hover:bg-lime-300"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default PackageDetails;
