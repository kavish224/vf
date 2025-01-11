import axios from "axios";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/authAtom";

export const Profile = () => {
    const [usrProf, setUsrProf] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/current-user`, {
                    withCredentials: true,
                });
                setUsrProf(response.data.data);
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                setError("Failed to load profile. Please Login and try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);
    const logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AWS_URL}/users/logout`, {}, { withCredentials: true });
            if (response.data.statusCode === 200) {
                setAuth({ isAuthenticated: false, user: {} });
                navigate("/logout");
            }
        } catch (error) {
            console.log(error);
            setAuth({ isAuthenticated: false, user: {} });
        }
    };

    const handleImageChange = (type) => {
        alert(`Change ${type} clicked!`); // Replace with actual logic (e.g., file upload)
    };

    if (isLoading) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="bg-black p-2">
                    <NavBar/>
                </div>
                <div className="bg-black min-h-screen text-white flex items-center justify-center">
                    <p className="text-x">{error}</p>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="p-4 bg-black text-white">
                <NavBar />
            </div>
            <div className="bg-black min-h-screen text-black p-4">
                {/* Profile Header */}
                <div className="relative bg-darkGray shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                    <img
                        src={usrProf?.coverImage}
                        alt="Cover"
                        className="w-full h-48 md:h-64 object-cover"
                    />

                    {/* Buttons for changing cover and avatar */}
                    <div className="absolute inset-x-0 bottom-2 flex justify-end items-center gap-2 px-4">
                        <button
                            onClick={() => handleImageChange("coverImage")}
                            className="bg-black text-white text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-mutedGray shadow-lg"
                        >
                            ✎ Change Cover Image
                        </button>
                        <button
                            onClick={() => handleImageChange("avatar")}
                            className="bg-black text-white text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-mutedGray shadow-lg"
                        >
                            ✎ Change Avatar
                        </button>
                    </div>

                    {/* Profile Information */}
                    <div className="p-6 flex flex-col md:flex-row items-center md:space-x-6">
                        <div className="relative mb-4 md:mb-0">
                            <img
                                src={usrProf?.avatar}
                                alt="Avatar"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="text-center md:text-left text-white">
                            <h1 className="text-xl md:text-2xl font-bold">{usrProf?.fullname}</h1>
                            <p className="text-mutedGray">{usrProf?.username}</p>
                            <p className="text-mutedGray mb-4">{usrProf?.email}</p>
                        </div>
                    </div>
                </div>




                {/* Action Buttons */}
                <div className="mt-8 bg-darkGray shadow-lg rounded-lg p-6 flex flex-col gap-4 max-w-3xl mx-auto">
                    <Link to={"/update-acc-details"}><button className="w-full bg-lightGray text-black rounded hover:bg-mutedGray text-sm md:text-base lg:text-lg py-2 md:py-3 lg:py-4">
                        Update Account Details
                    </button></Link>
                    <Link to={"/change-pass"}><button className="w-full bg-lightGray text-black rounded hover:bg-mutedGray text-sm md:text-base lg:text-lg py-2 md:py-3 lg:py-4">
                        Change Password
                    </button></Link>
                    <button className="w-full bg-lightGray text-black rounded hover:bg-x text-sm md:text-base lg:text-lg py-2 md:py-3 lg:py-4" onClick={logout}>
                        Logout
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 bg-darkGray text-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                    <p>
                        <span className="font-semibold">Username:</span> {usrProf?.username}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {usrProf?.email}
                    </p>
                    <p>
                        <span className="font-semibold">Fullname:</span> {usrProf?.fullname}
                    </p>
                </div>
            </div>
        </>
    );
};
