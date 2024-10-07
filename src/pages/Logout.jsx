import { Link } from "react-router-dom"
import { NavBar } from "../components/NavBar"

export const Logout = () => {
    return (
        <>
            <div className="bg-black p-2">
                <NavBar/>
            </div>
            <div className="bg-black min-h-screen text-white pt-48">
                <div>
                    <div className="flex justify-center text-2xl">
                        Logged out Successfully
                    </div>
                    <div className="flex justify-center underline cursor-pointer">
                        <Link to={"/signin"} className="p-2">Signin</Link>
                        <Link to={"/signup"} className="p-2">Signup</Link>
                    </div>
                </div>
            </div>
        </>
    )
}