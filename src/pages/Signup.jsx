import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { authState } from "../recoil/authAtom"
export const Signup = () => {
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [,setAuth] = useRecoilState(authState);
    const navigate = useNavigate()
    const handleSignup = async() => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AWS_URL}/users/register`,{
                fullname,
                email,
                username,
                password
            }, {withCredentials: true})
            if (response.status === 201 && response.data) {
                const accessToken = response.data.data.accessToken;
                const userResponse = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/current-user`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                });
                setAuth({
                    isAuthenticated: true,
                    user: userResponse.data.data,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Error in registering user", error);
            alert("Error in registering user")
        }
    }
    return (
        <div>
            <div className="flex justify-center p-20 bg-black text-white min-h-screen">
                <div className="flex flex-col w-full max-w-sm">
                    <div className="rounded-lg w-full text-center p-5 shadow-x shadow-md">
                        <Heading label={"Sign up"} />
                        <Input label={"Fullname"} onChange={(e) => setFullname(e.target.value)}/>
                        <Input label={"Email"} onChange={(e) => setEmail(e.target.value)}/>
                        <Input label={"Username"} onChange={(e) => setUsername(e.target.value)}/>
                        <Input label={"Password"} onChange={(e) => setPassword(e.target.value)}/>
                        {/* <SubHeading label={"Profile image"}/>
                        <input type="file" accept="image/*" className="rounded-full"/>
                        <SubHeading label={"Cover image"}/>
                        <input type="file" accept="image/*" className="rounded-full"/>  */}
                        <div className="pt-4">
                            <Button label={"Register"} onClick={handleSignup}/>
                        </div>
                        <div className="flex items-center justify-center">
                            <SubHeading label={"Already have an account?"}/>
                            <Link to={"/signin"} className="block text-sm font-medium text-left py-2 mb-1 pl-1 underline">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}