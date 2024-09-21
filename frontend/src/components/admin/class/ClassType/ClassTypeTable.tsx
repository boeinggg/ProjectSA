import React from "react";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";

interface ClassTypeTableProps {
    classTypes: ClassTypesInterface[];
    onEdit: (classType: ClassTypesInterface) => void;
    onDelete: (id: number, name: string) => void;
}

const ClassTypeTable: React.FC<ClassTypeTableProps> = ({ classTypes, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="text-left">
                    <th className="border-b p-2 w-1/6"></th>
                    <th className="border-b p-2 w-1/2">Name</th>
                    <th className="border-b p-2 w-1/3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {classTypes.map((classType, index) => (
                    <tr key={classType.ID}>
                        <td className="border-b p-2 text-center">{index + 1}</td>
                        <td className="border-b p-2">{classType.Name}</td>
                        <td className="border-b p-2">
                            <button
                                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                                onClick={() => onEdit(classType)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
                                onClick={() => onDelete(classType.ID!, classType.Name ?? "Unnamed Class Type")}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClassTypeTable;
