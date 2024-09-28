import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
// ---------------------User-------------------------
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Package from "./pages/User/Package";
import Payment from "./pages/User/Payment";
import ClassBooking from "./pages/User/Class";
// ---------------------ADMIN------------------------
import Dashboard from "./pages/Admin/Dashboard";
import Class from "./pages/Admin/Class";
import ClassCreate from "./pages/Admin/Class/Create";
import EditClass from "./pages/Admin/Class/Edit";
import ClassType from "./pages/Admin/Class/ClassType";
import Trainer from "./pages/Admin/Class/Trainer";
import PackageAd from "./pages/Admin/Packages";
import Createpackage from "./pages/Admin/Packages/Create";
import EditPackage from "./pages/Admin/Packages/Edit";
import ListAdmin from "./pages/Admin/Member/ListAdmin";
import EditAdmin from "./pages/Admin/Member/ListAdmin/Edit";
import CreateAdmin from "./pages/Admin/Member/ListAdmin/Create";
import ListMember from "./pages/Admin/Member/ListMember";
import EditMembember from "./pages/Admin/Member/ListMember/Edit";
import PaymentAd from "./pages/Admin/Payment";

const App: React.FC = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/package" element={<Package />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/classBooking" element={<ClassBooking />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/class" element={<Class />} />
                <Route path="/class/create" element={<ClassCreate />} />
                <Route path="/class/edit/:classID" element={<EditClass />} />
                <Route path="/class/classType" element={<ClassType />} />
                <Route path="/class/trainer" element={<Trainer />} />
                <Route path="/admin/package" element={<PackageAd />} />
                <Route path="admin/package/create" element={<Createpackage />} />
                <Route path="/admin/package/edit/:id" element={<EditPackage />} />
                <Route path="/ListAdmin" element={<ListAdmin />} />
                <Route path="/EditAdmin/:id" element={<EditAdmin />} />
                <Route path="/CreateAdmin" element={<CreateAdmin />} />
                <Route path="/ListMember" element={<ListMember />} />
                <Route path="/EditMember/:id" element={<EditMembember />} />
                <Route path="/admin/payment" element={<PaymentAd />} />
            </Routes>
        </Router>
    );
};

export default App;
