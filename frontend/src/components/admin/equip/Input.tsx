import React from "react";

interface InputProps {
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => (
    <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="border rounded-xl w-[300px] h-[40px] mb-4 " />
);

export default Input;
