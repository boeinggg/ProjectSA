import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MembersInterface } from "../../../interfaces/IMember";
import { GetMembers } from "../../../services/https/member";
import { GetPaymentsByMemberID } from "../../../services/https/payment";
import { PaymentInterface } from "../../../interfaces/IPayment";

const TableList: React.FC = () => {
    const [members, setMembers] = useState<MembersInterface[]>([]);
    const [paymentsMap, setPaymentsMap] = useState<Record<number, PaymentInterface[]>>({}); // Initialize an empty object to map payments by member ID
    const navigate = useNavigate();

    // Fetch members data on component mount
    useEffect(() => {
        const getMembersAndPayments = async () => {
            const res = await GetMembers(); // Fetch members
            if (res) {
                setMembers(res);

                // Fetch payments for each member
                const paymentsData: Record<number, PaymentInterface[]> = {};
                for (const member of res) {
                    const payments = await GetPaymentsByMemberID(member.ID); // Fetch payments for this member
                    paymentsData[member.ID] = payments; // Map payments to the member ID
                }
                setPaymentsMap(paymentsData); // Update state with payments
            }
        };
        getMembersAndPayments();
    }, []);

    console.log(paymentsMap);

    // const handlegoto = (id: number | undefined) => {
    //     localStorage.setItem("MemberID", String(id));
    //     console.log(id);
    //     console.log(`Editing data with id: ${id}`);
    // };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-[1000px] text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-green2 dark:text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            First name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type Member
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ? (
                        members.map((member, index) => (
                            <tr
                                key={member.ID || index}
                                className="odd:bg-white odd:dark:bg-gray4 even:bg-gray-50 even:dark:bg-gray3 border-b dark:border-white"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {member.FirstName}
                                </th>
                                <td className="px-6 py-4">{member.Username}</td>
                                <td className="px-6 py-4">
                                    {member.ID !== undefined && paymentsMap[member.ID]?.length > 0
                                        ? paymentsMap[member.ID].map((payment) => (
                                              <div key={payment.ID}>{payment.Package?.Duration_days}</div> // Display Package Name; adjust according to your data structure
                                        ))
                                        : "No Package"}
                                </td>
                                <td className="px-6 py-3 flex gap-4">
                                    <button
                                        className="text-green2"
                                        onClick={() => {
                                            if (member.ID) {
                                                navigate(`/EditMember/${member.ID}`);
                                            }
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center px-6 py-4">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableList;
