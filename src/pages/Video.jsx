import { useSearchParams } from "react-router-dom"
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export const Video = () => {
    const[vid, setVid] = useState([])
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    useEffect(()=>{
        const fetchVideo = async() => {
            const video = await axios.get(`http://65.2.190.212:8000/api/v1/video/v/${videoId}`)
            setVid(video.data.data[0])
        }
        fetchVideo()
    },[videoId])
    const handleSubscribe = async () => {
        try {
            // Simulate the subscribe action (you can integrate this with your backend)
            if (!vid.owner.isSubscribed) {
                // Make an API call to subscribe to the channel
                // await axios.post(`{{API_URL}}/subscribe`, { channelId: vid.owner._id });
                console.log("Subscribed to channel!");
                // Update the state to reflect the subscription status
                setVid(prev => ({
                    ...prev,
                    owner: {
                        ...prev.owner,
                        isSubscribed: true
                    }
                }));
            } else {
                console.log("Already subscribed.");
            }
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };
    return(
        <>
        <div className="bg-black text-white p-2">
        <div className="p-2">
            <NavBar/>
        </div>
            <div className="bg-black p-2 text-white min-h-screen">
                <div className="video-container w-full max-w-[90%] md:max-w-[800px] lg:max-w-[1000px] mx-auto my-4">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    {vid.videoFile ? (
                                <video controls className="absolute top-0 left-0 w-full h-full object-cover">
                                    <source src={vid.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>Loading video...</p> // Show a loading message or spinner
                            )}
                    </div>
                </div>
                <div className="pl-2 text-2xl">
                    {vid.title}
                </div>
                <div className="flex items-center mt-4">
                {vid.owner && vid.owner.avatar ? (
                                <img
                                    src={vid.owner?.avatar}
                                    alt={vid.owner?.username}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-500 rounded-full mr-4"></div>
                            )}
                    <div className="flex justify-end">
                    <div className="flex flex-col">
                        <div>
                            {vid.owner?.username}
                        </div>
                        <div className="text-xs">
                            {vid.owner?.subscribersCount} Subscribers
                        </div>
                    </div>
                    <div>    
                        <button onClick={handleSubscribe}
                                    className={`ml-3 px-4 py-2 rounded-full ${
                                        vid.owner && vid.owner.isSubscribed
                                            ? 'bg-white text-black'
                                            : 'bg-x hover:bg-white hover:text-black'
                                    } text-white`}
                                    disabled={vid.owner && vid.owner.isSubscribed}>
                            {vid.owner && vid.owner.isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}