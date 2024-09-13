import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
// ---------------------User-------------------------
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Package from "./pages/User/Payment";
// ---------------------ADMIN------------------------
import Dashboard from "./pages/Admin/Dashboard";
import Class from "./pages/Admin/Class";
import ClassCreate from "./pages/Admin/Class/Create";
import EditClass from "./pages/Admin/Class/Edit";
import ClassType from "./pages/Admin/Class/ClassType";
import Trainer from "./pages/Admin/Class/Trainer";

const App: React.FC = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/package" element={<Package />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/class" element={<Class />} />
                <Route path="/class/create" element={<ClassCreate />} />
                <Route path="/class/edit/:classID" element={<EditClass />} />
                <Route path="/class/classType" element={<ClassType />} />
                <Route path="/class/trainer" element={<Trainer />} />
            </Routes>
        </Router>
    );
};

export default App;
