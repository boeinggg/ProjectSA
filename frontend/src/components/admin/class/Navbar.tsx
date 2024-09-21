import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetMemberById } from "../../../services/https/member";
import { GetAdminById } from "../../../services/https/admin"; 

interface NavbarProps {
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userInitials, setUserInitials] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        // ดึงข้อมูลจาก localStorage หรือ API
        const fetchUserData = async () => {
            const userId = localStorage.getItem("id");
            const userRole = localStorage.getItem("role"); // ดึงบทบาทจาก localStorage

            if (userId && userRole) {
                try {
                    // ใช้ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ตามบทบาท
                    let userData;
                    if (userRole === "member") {
                        userData = await GetMemberById(Number(userId));
                    } else if (userRole === "admin") {
                        userData = await GetAdminById(Number(userId));
                    }

                    if (userData) {
                        // สร้างอักษรย่อจากชื่อผู้ใช้
                        const initials = `${userData.FirstName.charAt(0)}${userData.LastName.charAt(0)}`.toUpperCase();
                        setUserInitials(initials);
                    } else {
                        setUserInitials("JL"); // ใช้ค่าเริ่มต้นถ้าหากไม่พบข้อมูล
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setUserInitials("JL"); // ใช้ค่าเริ่มต้นถ้าหากไม่สามารถดึงข้อมูลได้
                }
            } else {
                setUserInitials("JL"); // ใช้ค่าเริ่มต้นถ้าหากไม่พบ userId หรือ role
            }
        };

        fetchUserData();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear(); // ล้างข้อมูลทั้งหมดจาก localStorage
        navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าโฮม
    };

    return (
        <div className="bg-black w-full">
            <div className="navbar bg-black h-[76px] flex items-center border-b-4 border-white">
                <h1 className="text-xl text-green1 ml-14">{title}</h1>
                <div className="flex items-center ml-auto mr-14 relative">
                    <div
                        className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                            {userInitials || "JL"} {/* แสดงตัวอักษรจาก FirstName และ LastName */}
                        </span>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-[185px] w-48 bg-gray4 bg-opacity-95 border border-green3 rounded-lg shadow-lg z-10">
                            <ul className="text-white p-2">
                                <li className="p-2 hover:bg-green5 cursor-pointer">Profile</li>
                                <li className="p-2 hover:bg-green5 cursor-pointer">Settings</li>
                                <li className="p-2 hover:bg-green5 cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
