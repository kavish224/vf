import { useRecoilValue } from "recoil"
import { NavBar } from "../components/NavBar"
import { authState } from "../recoil/authAtom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

export const ChannelProf = () => {
    const currentUser = useRecoilValue(authState);
    const [isSubs, setIsSubs] = useState(false);
    const [searchParams] = useSearchParams();
    const cName = searchParams.get("id");
    const [channel, setChannel] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const channel = async () => {
            const response = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/c/${cName}`,{withCredentials: true});
            setChannel(response.data.data);
            const initialSub = response.data.data.isSubscribed || false;
            setIsSubs(initialSub);
        }
        channel();
    },[cName])
    const handleSubscribe = async () => {
        if (!currentUser.isAuthenticated) {
            alert("Please Signin to Subscribe the Channel");
            navigate("/signin");
            return;
        }
        if (!channel?._id) {
            console.error("Channel ID not found");
            return;
        }
        setIsSubs(prev => !prev);
        setSubscriberCount(prev => isSubs ? prev - 1 : prev + 1);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_AWS_URL}/subscriptions/c/${channel._id}`,
                {},
                { withCredentials: true }
            );
            if (!response.data.success) {
                setIsSubs(prev => !prev);
                setSubscriberCount(prev => isSubs ? prev + 1 : prev - 1);
                throw new Error("Subscription update failed");
            }
        } catch (error) {
            setIsSubs(prev => !prev);
            setSubscriberCount(prev => isSubs ? prev + 1 : prev - 1);
            console.error("Error updating subscription:", error);
            alert("Failed to update subscription. Please try again.");
        }
    };
    return (
        <>
            <nav className="bg-black p-2 z-50">
                <NavBar />
            </nav>
            <div className="bg-black min-h-screen">
                <div className="relative bg-darkGray shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                    <img
                        src={channel?.coverImage}
                        alt="Cover"
                        className="w-full h-48 md:h-64 object-cover"
                    />
                    <div className="p-6 flex md:flex-row items-start md:space-x-6">
                        <div className="relative mb-4 md:mb-0">
                            <img
                                src={channel?.avatar}
                                alt="Avatar"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="flex flex-col items-start ml-6 mt-2">
                            <div>
                                <p className="text-2xl text-white">{channel?.username}</p>
                                <p className="text-mutedGray">Subscribers: {channel?.subscribersCount}</p>
                            </div>
                            <button
                                className={`px-6 py-2.5 mt-2 rounded-full transition-all duration-300 
                                    ${isSubs
                                        ? "bg-lightGray text-black hover:bg-x"
                                        : "bg-x text-white hover:bg-x/90"
                                    }`}
                                onClick={handleSubscribe}
                            >
                                {isSubs ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}