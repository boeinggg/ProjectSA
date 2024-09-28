import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/admin/class/Navbar";
import SideBar from "../../../../../components/admin/class/SideBar";
import { useParams } from "react-router-dom";
import { MembersInterface } from "../../../../../interfaces/IMember";
import { GetMemberById } from "../../../../../services/https/member";
import EditForm from "../../../../../components/admin/member/EditForm";

const EditMember: React.FC = () => {
    const { id } = useParams();

    const [member, setMember] = useState<MembersInterface | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                if (id) {
                    const response = await GetMemberById(Number(id));
                    setMember(response); // Assuming response.data contains the admin details
                }
            } catch (error) {
                console.error("Error fetching admin:", error);
            }
        };

        fetchMember();
    }, [id]);

    if (!member) {
        return <div>Loading...</div>; // Add a loading state while admin data is being fetched
    }

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Member" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 text-secondary">Edit Admin</h1>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className=" mt-5 w-[700px] h-[500px] rounded-3xl overflow-auto scrollable-div flex justify-center bg-gray4 backdrop-blur-sm">
                        <div className="flex flex-row items-start m-8 text-green1 ">
                            <EditForm Data={member} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMember;
