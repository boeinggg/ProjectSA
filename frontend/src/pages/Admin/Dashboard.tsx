import "../../App.css";
import SideBar from "../../components/admin/class/SideBar";
import Navbar from "../../components/admin/class/Navbar";

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-gray2 w-full">
                <Navbar title="Dashboard" />
            </div>
        </div>
    );
};

export default Dashboard;
