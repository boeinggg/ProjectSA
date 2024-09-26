import React from "react";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import CreatepackageForm from "../../../../components/admin/package/CreatepackageForm";

const Createpackage: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-5xl text-green1 ml-14 mt-10 text-secondary">Create Package</h1>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className=" mt-5 w-[1500px] h-[1000px] rounded-3xl overflow-auto scrollable-div flex justify-center bg-sidebar backdrop-blur-sm">
                        <div className="flex flex-row items-start m-8 text-green1 ">
                            <CreatepackageForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createpackage;
