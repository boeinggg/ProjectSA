import React, { useState, useEffect } from "react";
import { GetPayments } from "../../../services/https/payment";
import { PaymentInterface } from "../../../interfaces/IPayment";

const TablePayment: React.FC = () => {
    const [payments, setPayments] = useState<PaymentInterface[]>([]); // Initialize an empty array for payments

    // Fetch payment data on component mount
    useEffect(() => {
        const getPayments = async () => {
            const res = await GetPayments(); // Assuming GetPayments is an API call
            if (res) {
                setPayments(res);
            }
        };
        getPayments();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-[1000px] text-lg text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-green dark:text-black">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xl ">
                            Payment Method
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl ">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl ">
                            Member ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl ">
                            Package ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl "></th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map((payment, index) => (
                            <tr
                                key={payment.ID || index}
                                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-b dark:border-white transition duration-300"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {payment.PaymentMethodName}
                                </td>
                                <td className="px-6 py-4">{payment.Amount}</td>
                                <td className="px-6 py-4">{payment.MemberID}</td>
                                <td className="px-6 py-4">{payment.PackageID}</td>
                                <td className="px-6 py-4 text-right"></td>
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

export default TablePayment;
