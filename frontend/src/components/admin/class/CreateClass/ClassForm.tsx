import { useState } from "react";
import Dropzone from "../Dropzone";
import Label from "../Label";
import Input from "../Input";
import Select from "../Select";
import Textarea from "../Textarea";
import DateTimePicker from "../DateTimePicker";
import { TrainersInterface } from "../../../../interfaces/ITrainer";
import { ClassTypesInterface } from "../../../../interfaces/IClassType";
import { ClassesInterface } from "../../../../interfaces/IClass";

interface ClassFormProps {
    trainers: TrainersInterface[];
    classTypes: ClassTypesInterface[];
    onSave: (newClass: ClassesInterface) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ trainers, classTypes, onSave }) => {
    const [className, setClassName] = useState<string>("");
    const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>(1);
    const [selectedType, setSelectedType] = useState<number | undefined>(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState<string>("");
    const [classPic, setClassPic] = useState<File | null>(null); // Set the file here
    const [classPicURL, setClassPicURL] = useState<string>(""); // URL for preview or upload

    const [particNum, setParticNum] = useState<number | undefined>(undefined);

    // Helper function to convert file to base64 string
    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        let classPicData = classPicURL;

        // Convert file to base64 if a new image was dropped
        if (classPic) {
            classPicData = await getBase64(classPic);
        }

        const newClass: ClassesInterface = {
            ClassName: className,
            Deets: description,
            TrainerID: selectedTrainer,
            ClassPic: classPicData, // Use the base64 image or URL
            ParticNum: particNum,
            StartDate: startDate || undefined, // Convert null to undefined
            EndDate: endDate || undefined, // Convert null to undefined
            ClassTypeID: selectedType,
            AdminID: Number(localStorage.getItem("id")),
        };
        onSave(newClass);
    };

    return (
        <div className="form-container">
            <Label text="Class Picture" />
            <Dropzone
                onDrop={(acceptedFiles) => {
                    const file = acceptedFiles[0];
                    setClassPic(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setClassPicURL(reader.result as string); // For preview
                    reader.readAsDataURL(file);
                }}
                classPicURL={classPicURL} // Provide the preview URL
            />

            <Label text="Class Name" />
            <Input placeholder="Enter Name" value={className} onChange={(e) => setClassName(e.target.value)} />

            <Label text="Class Type" />
            <Select
                options={classTypes.map((type) => ({ value: type.ID.toString(), label: type.Name }))}
                value={selectedType?.toString()}
                onChange={(value) => setSelectedType(Number(value))}
                label="Type"
            />

            <Label text="Description" />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write description" />

            <Label text="Trainer" />
            <Select
                options={trainers.map((trainer) => ({ value: trainer.ID.toString(), label: trainer.Name }))}
                value={selectedTrainer?.toString()}
                onChange={(value) => setSelectedTrainer(Number(value))}
                label="Trainer"
            />

            <Label text="Start Date and Time" />
            <DateTimePicker selectedDate={startDate || new Date()} onChange={setStartDate} label="Start Date and Time" />

            <Label text="End Date and Time" />
            <DateTimePicker selectedDate={endDate || new Date()} onChange={setEndDate} label="End Date and Time" />

            <Label text="Number of Attendees" />
            <Input placeholder="Number of Attendees" value={particNum?.toString()} onChange={(e) => setParticNum(Number(e.target.value))} />

            <button onClick={handleSubmit} className="submit-button">
                Submit
            </button>
        </div>
    );
};

export default ClassForm;
