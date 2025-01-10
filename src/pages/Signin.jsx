import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/authAtom";

export const Signin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!user || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_AWS_URL}/users/login`,
                { username: user, password },
                { withCredentials: true }
            );
            if (response.status === 200 && response.data) {
                const userResponse = await axios.get(
                    `${import.meta.env.VITE_AWS_URL}/users/current-user`,
                    { withCredentials: true }
                );
                setAuth({
                    isAuthenticated: true,
                    user: userResponse.data.data,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
            setErrorMessage("Login failed. Please check your username and password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center p-28 bg-black text-white min-h-screen">
            <div className="flex flex-col w-full max-w-sm">
                <div className="rounded-lg w-full text-center p-5 shadow-lg">
                    <Heading label="Signin" />
                    <Input
                        label="Username"
                        placeholder="xyz22"
                        onChange={(e) => setUser(e.target.value)}
                        aria-label="Username"
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        aria-label="Password"
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}
                    <div className="pt-4">
                        <Button
                            label={isLoading ? "Logging in..." : "Login"}
                            onClick={handleLogin}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <SubHeading label="New to Videotube?" />
                        <Link
                            to="/signup"
                            className="text-sm font-medium underline ml-2 hover:text-gray-300"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
