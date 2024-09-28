import React from "react";

import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import TableList from "../../../../components/admin/member/MemberTableList";

const ClassCreate: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Member" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 ">List Member</h1>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="flex flex-row items-start m-8 text-green1">
                        <TableList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCreate;
