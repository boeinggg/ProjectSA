import React from "react";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import { GrAddCircle } from "react-icons/gr";
import TableList from "../../../../components/admin/member/AdminTableList";
import { Link } from "react-router-dom";

const AdminList: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Admin" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 ">List Admin</h1>
                        <Link to="/CreateAdmin">
                            <button className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg">
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Create</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="flex flex-row items-start m-8 text-green1 ">
                        <TableList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminList;
