import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { NavBar } from "../components/NavBar"
import axios from "axios"

export const Update = () => {
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleUpdate = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (!name.trim()) {
            setErrorMessage("Please Enter Name")
            return;
        }
        setIsLoading(true)
        try {
            const updt = await axios.patch(`${import.meta.env.VITE_AWS_URL}/users/update-account`, { fullName: name }, { withCredentials: true });
            if (updt.data.statusCode === 200) {
                setSuccessMessage("Fullname Changed Successfully");
                setName("");
            } else {
                setErrorMessage("Please try Again")
            }
        } catch (error) {
            setErrorMessage("failed to change name please try again")
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="bg-black p-2">
                <NavBar />
            </div>
            <div className="bg-black text-white min-h-screen flex justify-center items-center">
                <div className="flex flex-col shadow-md shadow-x p-8 rounded-2xl ">
                    <h2 className="text-xl font-bold mb-6 text-center">Update Account Details</h2>
                    <Input label={"Full Name"} onChange={(e) => setName(e.target.value)} value={name} />
                    <Button label={isLoading ? "Updating..." : "Update"} onClick={handleUpdate} disabled={isLoading} />
                    {errorMessage && (
                        <p className="text-err text-md mt-4">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-succ text-md mt-4">{successMessage}</p>
                    )}
                </div>
            </div>
        </>
    )
}