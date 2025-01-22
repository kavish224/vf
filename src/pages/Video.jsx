import { useSearchParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { SugVideoCard } from "../components/SugVideoCard";
import { formatDistanceToNow } from "date-fns";
import { CommentCard } from "../components/CommentCard";
export const Video = () => {
    const [vid, setVid] = useState({});
    const [comm, setComm] = useState([]);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const [sugVideo, setSugVideo] = useState([]);
    const [isSubs, setIsSubs] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [videoRes, commentsRes, suggestionsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_AWS_URL}/video/v/${videoId}`,{withCredentials:true}),
                    axios.get(`${import.meta.env.VITE_AWS_URL}/comment/${videoId}`),
                    axios.get(`${import.meta.env.VITE_AWS_URL}/video/`),
                ]);
                const video = videoRes.data.data[0];
                const initialSubStatus = video?.owner?.isSubscribed ?? false;
                setIsSubs(initialSubStatus);
                setVid(video);
                setSubscriberCount(video?.owner?.subscribersCount || 0);
                setComm(commentsRes.data.data);
                setSugVideo(suggestionsRes.data.data.docs);
                document.title = `${video?.title} - VideoTube`;
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching video data: ", error);
            }
        };
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);
    const handleSubscribe = async () => {
        if (!vid?.owner?._id) {
            console.error("Channel ID not found");
            return;
        }
        setIsSubs(prev => !prev);
        setSubscriberCount(prev => isSubs ? prev - 1 : prev + 1);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_AWS_URL}/subscriptions/c/${vid.owner._id}`,
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
    const sinceUpload = () => {
        return vid.createdAt
            ? formatDistanceToNow(new Date(vid.createdAt), { addSuffix: true })
            : "Error fetching upload time";
    };
    return (
        <div className="bg-black text-white p-2">
            <div className="p-2">
                <NavBar />
            </div>
            <div className="flex flex-col md:flex-row md:min-h-screen p-3">
                <div className="w-full md:w-[80%] flex flex-col md:min-h-screen">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                        {vid.videoFile ? (
                            <video
                                key={vid._id}
                                controls
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            >
                                <source src={vid.videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p>Loading video...</p>
                        )}
                    </div>

                    <div className="pl-2 text-2xl mt-2">
                        {vid.title || "Error loading video"}
                    </div>

                    <div className="flex items-center mt-4 px-2">
                        {vid.owner?.avatar ? (
                            <img
                                src={vid.owner.avatar}
                                alt={vid.owner.username}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-gray-500 rounded-full mr-4"></div>
                        )}
                        <div className="flex flex-col">
                            <div>{vid.owner?.username}</div>
                            <div className="text-xs">{subscriberCount} Subscribers</div>
                        </div>
                        <button
                            className={`ml-4 px-4 py-2 rounded-full ${
                                isSubs
                                    ? "bg-white text-black"
                                    : "bg-x text-white hover:bg-white hover:text-black"
                            }`}
                            onClick={handleSubscribe}
                        >
                            {isSubs ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>

                    <div className="shadow-md shadow-x p-4 mt-2 rounded-lg">
                        {vid.views} views • {sinceUpload()}
                        <div className="pt-2">{vid.description}</div>
                    </div>

                    <div className="mt-6">
                        {comm?.totalDocs} {comm.totalDocs > 1 ? "Comments" : "Comment"}
                        <div className="mt-2">
                            {comm.docs?.map((comment) => (
                                <CommentCard
                                    key={comment._id}
                                    avatar={comment.owner[0]?.avatar}
                                    fullname={comment.owner[0]?.fullname}
                                    content={comment.content}
                                    likes={comment.likesCount}
                                    createdAt={comment.createdAt}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[25%] flex flex-col mt-2 md:mt-0 md:pl-4">
                    <div className="space-y-4">
                        {sugVideo.map((video) => (
                            <SugVideoCard
                                key={video._id}
                                thumbUrl={video.thumbnail}
                                title={video.title}
                                views={video.views}
                                owner={video.ownerDetails.username}
                                videoId={video._id}
                                createdAt={video.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};