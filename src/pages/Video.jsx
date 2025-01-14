import { useSearchParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { SugVideoCard } from "../components/SugVideoCard";
import { formatDistanceToNow } from "date-fns";
import { CommentCard } from "../components/CommentCard";
export const Video = () => {
    const [vid, setVid] = useState([]);
    const [comm, setComm] = useState([]);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const [sugVideo, setSugVideo] = useState([]);
    useEffect(() => {
        const sugVideos = async () => {
            try {
                const video = await axios.get(`${import.meta.env.VITE_AWS_URL}/video/`);
                setSugVideo(video.data.data.docs);
            } catch (error) {
                console.error("Error fetching Suggested videos: ", error);
            }
        }
        sugVideos();
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AWS_URL}/comment/${videoId}`);
                const comments = response.data.data;
                setComm(comments);
            } catch (error) {
                console.error("Error fetching comments: ", error);
            }
        }
        fetchComments();
    }, [videoId]);
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const video = await axios.get(`${import.meta.env.VITE_AWS_URL}/video/v/${videoId}`);
                setVid(video.data.data[0])
                document.title = `${video.data.data[0]?.title} - VideoTube`;
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching video: ", error);
            }
        }
        fetchVideo();
    }, [videoId]);
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
    const sinceUpload = () => {
        return vid.createdAt ? formatDistanceToNow(new Date(vid.createdAt), { addSuffix: true }) : 'error in fetching upload time';
    }
    return (
        <>
            <div className="bg-black text-white p-2">
                <div className="p-2">
                    <NavBar />
                </div>
                <div className="flex flex-col md:flex-row md:min-h-screen p-3">
                    <div className="w-full md:w-[80%] flex flex-col md:min-h-screen">
                        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                            {vid.videoFile ? (
                                <video key={vid._id} controls className="absolute top-0 left-0 w-full h-full object-cover">
                                    <source src={vid.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>Loading video...</p>
                            )}
                        </div>

                        <div className="pl-2 text-2xl mt-2">
                            {vid.title ? vid.title : "error in loading video"}
                        </div>

                        <div className="flex items-center mt-4 px-2">
                            {vid.owner && vid.owner.avatar ? (
                                <img
                                    src={vid.owner?.avatar}
                                    alt={vid.owner?.username}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-500 rounded-full mr-4"></div>
                            )}
                            <div className="flex flex-col">
                                <div>{vid.owner?.username}</div>
                                <div className="text-xs">{vid.owner?.subscribersCount} Subscribers</div>
                            </div>
                            {/* <button onClick={handleSubscribe}
                                className={`ml-4 px-4 py-2 rounded-full ${vid.owner?.isSubscribed ? 'bg-white text-black' : 'bg-x text-white hover:bg-white hover:text-black'} text-black`}
                                disabled={vid.owner?.isSubscribed}>
                                {vid.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                            </button> */}
                        </div>
                        <div className="shadow-md shadow-x p-4 mt-2 rounded-lg">
                            {vid?.views} views • {sinceUpload()}
                            <div className="pt-2">
                                {vid?.description}
                            </div>
                        </div>
                        <div className="mt-6">
                            {comm?.totalDocs} {comm.totalDocs > 1 ? "Comments" : "Comment"}
                            <div className="mt-2">
                                {comm.docs ? comm.docs?.map(comments => (
                                    <CommentCard key={comments._id} avatar={comments.owner[0]?.avatar} fullname={comments.owner[0]?.fullname} content={comments.content} likes={comments.likesCount} createdAt={comments.createdAt} />
                                )) : "Error in fetching comments"}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[25%] flex flex-col mt-2 md:mt-0 md:pl-4">
                        <div className="space-y-4">
                            {sugVideo[0]?._id ? sugVideo.map(video => (
                                <SugVideoCard
                                    key={video._id}
                                    thumbUrl={video.thumbnail}
                                    title={video.title}
                                    views={video.views}
                                    owner={video.ownerDetails.username}
                                    videoId={video._id}
                                    createdAt={video.createdAt}
                                />
                            )) : "Error in loading suggestion"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}