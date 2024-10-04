import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { NavBar } from "../components/NavBar"
import { SubHeading } from "../components/SubHeading"
export const Signup = () => {
    return (
        <div>
            <div className="flex justify-center p-20 bg-black text-white min-h-screen">
                <div className="flex flex-col w-full max-w-sm">
                    <div className="rounded-lg w-full text-center p-5 shadow-x shadow-md">
                        <Heading label={"Sign up"} />
                        <Input label={"Fullname"} />
                        <Input label={"Email"} />
                        <Input label={"Username"} />
                        <Input label={"Password"} />
                        {/* <SubHeading label={"Profile image"}/>
                        <input type="file" accept="image/*" className="rounded-full"/>
                        <SubHeading label={"Cover image"}/>
                        <input type="file" accept="image/*" className="rounded-full"/>  */}
                        <div className="pt-4">
                            <Button label={"Register"} />
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