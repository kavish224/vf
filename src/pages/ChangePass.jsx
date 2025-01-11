import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { NavBar } from "../components/NavBar"
import axios from "axios"

export const ChangePass = () => {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleChangePass = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (!oldPass || !newPass) {
            setErrorMessage("please enter both the passwords")
            return;
        }
        setIsLoading(true)
        try {
            const changePass = await axios.post(`${import.meta.env.VITE_AWS_URL}/users/change-password`, { oldPassword: oldPass, newPassword: newPass }, { withCredentials: true });
            if (changePass.data.statusCode === 200) {
                setSuccessMessage("Password Changed Successfully");
                setNewPass("");
                setOldPass("")
            } else {
                setErrorMessage("Invalid Password")
            }
        } catch (error) {
            setErrorMessage("failed to change password please try again")
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
                    <h2 className="text-xl font-bold mb-6 text-center">Change Password</h2>
                    <Input label={"Old Password"} onChange={(e) => setOldPass(e.target.value)} type="password" value={oldPass} placeholder="Enter your old password"/>
                    <Input label={"New Password"} onChange={(e) => setNewPass(e.target.value)} type="password" value={newPass} placeholder="Enter your new password"/>
                    <Button label={isLoading ? "Changing..." : "Change Password"} onClick={handleChangePass} disabled={isLoading} />
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