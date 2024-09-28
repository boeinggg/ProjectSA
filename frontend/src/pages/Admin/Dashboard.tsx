import "../../App.css";
import SideBar from "../../components/admin/class/SideBar";
import Navbar from "../../components/admin/class/Navbar";
import Stat from "../../components/admin/dashboard/Stat";
import TableList from "../../components/admin/member/AdminTableList";
import TableListMem from "../../components/admin/member/MemberTableList";

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="w-full" style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}>
                <Navbar title="Dashboard" />
                <div className="overflow-auto scrollable-div bg-transparent h-[600px]">
                    <div className="flex space-y-7 justify-center items-center flex-col text-white">
                        <Stat />
                        <h1>Member</h1>
                        <TableListMem />
                        <h1>Admin</h1>
                        <TableList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
