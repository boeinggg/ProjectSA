import React, { useEffect, useState } from "react";
import Card from "../../../components/admin/package/Card";
import Navbar from "../../../components/admin/class/Navbar";
import SideBar from "../../../components/admin/class/SideBar";
import { Link } from "react-router-dom";
import "../../../App.css";
import { PackageInterface } from "../../../interfaces/IPackage";
import { GetPackages } from "../../../services/https/package";
import { Toaster } from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";

const PackageAd: React.FC = () => {
    const [packages, setPackages] = useState<PackageInterface[]>([]);

    const fetchPackages = async () => {
        try {
            const res = await GetPackages();
            console.log("Packages data:", res); // Debugging log
            if (res) {
                setPackages(res);
            }
        } catch (error) {
            console.error("Failed to fetch packages.", error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []); // Dependency array added to prevent infinite loop

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full h-screen">
                <Navbar title="Package" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <div className="ml-auto mr-14 mt-2">
                            <Link to ="/admin/package/create">
                            <button
                                className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray4 rounded-full  hover:bg-green5 shadow-md hover:shadow-lg group"
                                // onClick={openModal}
                            >
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer group-hover:text-white text-green5 mr-2 " />
                                <span>Create Package</span>
                            </button></Link>
                        </div>
                    </div>
                    <div className="text-white bg-black overflow-auto h-[520px] scrollable-div">
                        <div className="container mx-auto py-12 px-6 pl-12 ">
                            {packages.length === 0 ? (
                                <p className="text-center text-xl">No packages available.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-50">
                                    {packages.map((pkg, index) => {
                                        console.log("Package data:", pkg); // Debugging each package
                                        return (
                                            <Card
                                                key={pkg.PackageID || index}
                                                name={pkg.PackageName || "No Name"}
                                                price={pkg.Price ? pkg.Price.toString() : "No Price"}
                                                description={pkg.Description || "No Description"}
                                                duration={pkg.Duration_days || "No Duration"}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Toaster /> {/* Toaster should be inside a parent element */}
            </div>
        </div>
    );
};

export default PackageAd;
