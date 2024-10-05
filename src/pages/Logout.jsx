import { NavBar } from "../components/NavBar"

export const Logout = () => {
    return (
        <>
            <div className="bg-black p-2">
                <NavBar/>
            </div>
            <div className="bg-black min-h-screen text-white flex justify-center items-center text-2xl">
                <div>
                    Logged out Successfully
                </div>
            </div>
        </>
    )
}