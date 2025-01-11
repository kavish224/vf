import { Link } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { Button } from "../components/Button"

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
                    <div className="flex justify-center underline cursor-pointer pt-4">
                        <Link to={"/signin"} className="p-2"><Button label={"Signin"}/></Link>
                        <Link to={"/signup"} className="p-2"><Button label={"Signup"}/></Link>
                        <Link to={"/"} className="p-2"><Button label={"Home"}/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}