import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { SubHeading } from "../components/SubHeading"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { authState } from "../recoil/authAtom"
export const Signin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [,setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
    const handleLogin = async()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_AWS_URL}/users/login`,
                {username:user,password},
                {withCredentials: true}
            );
            if (response.status === 200 && response.data) {
                const userResponse = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/current-user`, {withCredentials: true});
                setAuth({
                    isAuthenticated: true,
                    user: userResponse.data.data,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please check your username and password.");
        }
    }
    return (
        <div>
            <div className="flex justify-center p-28 bg-black text-white min-h-screen">
                <div className="flex flex-col w-full max-w-sm">
                    <div className="rounded-lg w-full text-center p-5 shadow-x shadow-md">
                        <Heading label={"Signin"} />
                        <Input label={"Username"} placeholder={"xyz22"} onChange={(e)=>setUser(e.target.value)}/>
                        <Input label={"Password"} placeholder={"********"} onChange={(e)=>setPassword(e.target.value)} type={"password"}/>
                        <div className="pt-4">
                            <Button label={"Login"} onClick={handleLogin}/>
                        </div>
                        <div className="flex items-center justify-center">
                            <SubHeading label={"New to Videotube"}/>
                            <Link to={"/signup"} className="block text-sm font-medium text-left py-2 mb-1 pl-1 underline">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}