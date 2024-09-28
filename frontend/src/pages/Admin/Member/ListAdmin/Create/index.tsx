import React from "react";
import Navbar from "../../../../../components/admin/class/Navbar";

import SideBar from "../../../../../components/admin/class/SideBar";
import AdminCreateForm from "../../../../../components/admin/member/AdminCreateForm";

const CreateAdmin: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Admin" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 text-1">Create Admin</h1>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className=" mt-5 w-[700px] h-[500px] rounded-3xl overflow-auto scrollable-div flex justify-center bg-gray4 backdrop-blur-sm">
                        <AdminCreateForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;
