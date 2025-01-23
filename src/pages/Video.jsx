import { Link, useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { SugVideoCard } from "../components/SugVideoCard";
import { formatDistanceToNow } from "date-fns";
import { CommentCard } from "../components/CommentCard";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/authAtom";
export const Video = () => {
    const [vid, setVid] = useState({});
    const [comm, setComm] = useState([]);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const [sugVideo, setSugVideo] = useState([]);
    const [isSubs, setIsSubs] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [comment, setComment] = useState("");
    const navigate = useNavigate()
    const currentUser = useRecoilValue(authState);
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [videoRes, commentsRes, suggestionsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_AWS_URL}/video/v/${videoId}`, { withCredentials: true }),
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
        if (!currentUser.isAuthenticated) {
            alert("Please Signin to Subscribe the Channel");
            navigate("/signin");
            return;
        }
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
    const handleComment = async () => {
        if (!currentUser.isAuthenticated) {
            alert("Please Signin to Comment");
            navigate("/signin");
            return;
        }
        if (!comment || comment.trim() === "") {
            alert("Please enter a comment");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_AWS_URL}/comment/${videoId}`, { content: comment }, { withCredentials: true });
            const newComment = {
                _id: response.data.data._id,
                content: response.data.data.content,
                owner: [{
                    username: currentUser?.user?.username,
                    fullname: currentUser?.user?.fullname,
                    avatar: currentUser?.user?.avatar
                }],
                createdAt: response.data.data.createdAt,
                likesCount: 0,
                isLiked: false
            };
            setComment("")
            // Update comments state with the new comment
            setComm(prevComm => ({
                ...prevComm,
                docs: [newComment, ...(prevComm.docs || [])],
                totalDocs: (prevComm.totalDocs || 0) + 1
            }));
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert("Failed to post comment. Please try again.");
        }
    }
    const sinceUpload = () => {
        return vid.createdAt
            ? formatDistanceToNow(new Date(vid.createdAt), { addSuffix: true })
            : "Error fetching upload time";
    };
    return (
        <div className="bg-black min-h-screen text-white">
            <div className="p-2 z-50 bg-black">
                <NavBar />
            </div>
            <div className="flex flex-col md:flex-row max-w-[2100px] mx-auto p-4 gap-6">
                {/* Main Content Column */}
                <div className="w-full md:flex-[2] flex flex-col max-w-4xl">
                    {/* Video Player */}
                    <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg bg-darkGray">
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
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-pulse text-mutedGray">Loading video...</div>
                            </div>
                        )}
                    </div>
                    {/* Video Title */}
                    <h1 className="text-2xl font-semibold mt-4 text-white">
                        {vid.title || "Error loading video"}
                    </h1>
                    {/* Channel Info & Subscribe Button */}
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-3">
                            {vid.owner?.avatar ? (
                                <Link to={`/c?id=${vid.owner?.username}`}>
                                    <img
                                        src={vid.owner.avatar}
                                        alt={vid.owner.username}
                                        className="w-12 h-12 rounded-full ring-2 ring-x/20"
                                    />
                                </Link>
                            ) : (
                                <div className="w-12 h-12 bg-darkGray rounded-full animate-pulse" />
                            )}
                            <div className="flex flex-col">
                                <Link to={`/c?id=${vid.owner?.username}`}>
                                    <span className="font-medium hover:text-x transition-colors">
                                        {vid.owner?.username}
                                    </span>
                                </Link>
                                <span className="text-sm text-mutedGray">
                                    {subscriberCount.toLocaleString()} Subscribers
                                </span>
                            </div>
                            <button
                                className={`ml-6 px-6 py-2.5 rounded-full font-medium transition-all duration-300 
                                    ${isSubs
                                        ? "bg-darkGray text-white hover:bg-x"
                                        : "bg-x text-white hover:bg-x/90"
                                    }`}
                                onClick={handleSubscribe}
                            >
                                {isSubs ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="mt-4 p-4 rounded-xl bg-darkGray/30 backdrop-blur-sm border border-x">
                        <div className="text-sm text-mutedGray mb-2">
                            {vid.views?.toLocaleString()} views • {sinceUpload()}
                        </div>
                        <p className="text-white/90 whitespace-pre-wrap">{vid.description}</p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">
                            {comm?.totalDocs?.toLocaleString()} {comm.totalDocs === 1 ? "Comment" : "Comments"}
                        </h3>

                        {/* Comment Input */}
                        <div className="flex items-start gap-4 mb-6">
                            <img
                                src={currentUser?.user?.avatar || vid?.owner?.avatar}
                                alt={currentUser?.user?.username || vid?.owner?.username}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-darkGray/30 border-b border-darkGray focus:border-x"
                                />
                            </div>
                            <Button
                                label="Comment"
                                className={`ml-6 px-6 py-2.5 min-w-[100px] rounded-full font-medium transition-all duration-300 
                                    ${isSubs ? "bg-darkGray text-white hover:bg-x" : "bg-x text-white hover:bg-x/90"}`}
                                onClick={handleComment} />
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
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

                {/* Suggested Videos Column */}
                <div className="w-full md:flex-[1] xl:flex-[0.8] space-y-4 max-w-md">
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
    );
};