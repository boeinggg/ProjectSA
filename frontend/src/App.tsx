import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
// ---------------------User-------------------------
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Package from "./pages/User/Package";
import Payment from "./pages/User/Payment";
// ---------------------ADMIN------------------------
import Dashboard from "./pages/Admin/Dashboard";
import Class from "./pages/Admin/Class";
import ClassCreate from "./pages/Admin/Class/Create";
import EditClass from "./pages/Admin/Class/Edit";
import ClassType from "./pages/Admin/Class/ClassType";
import Trainer from "./pages/Admin/Class/Trainer";
import PackageAd from "./pages/Admin/Packages";

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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/class" element={<Class />} />
                <Route path="/class/create" element={<ClassCreate />} />
                <Route path="/class/edit/:classID" element={<EditClass />} />
                <Route path="/class/classType" element={<ClassType />} />
                <Route path="/class/trainer" element={<Trainer />} />
                <Route path="/admin/package" element={<PackageAd />} />
            </Routes>
        </Router>
    );
};

export default App;
