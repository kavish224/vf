import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { VideoCard } from '../components/VideoCard';
import axios from 'axios';
function Home() {
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const videos = async () => {
            try {
                const video = await axios.get(`${import.meta.env.VITE_AWS_URL}/video/`);
                setVideo(video.data.data.docs);
                setLoading(false)
                document.title = "VideoTube";
            } catch (error) {
                setError("Error in loading videos")
                console.error("error in loading videos", error);
                setLoading(false)
            }
        }
        videos();
    }, []);
    return (
        <>
            <div className='p-4 bg-black text-white '>
                <NavBar />
            </div>
            <div className='bg-black min-h-screen text-white p-4'>
                <div className='flex flex-wrap justify-center gap-4'>
                {loading ? (
                        <div>Loading videos...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : video.length > 0 ? (
                        video.map(video => (
                            <VideoCard
                                key={video._id}
                                thumbUrl={video.thumbnail}
                                title={video.title}
                                views={video.views}
                                owner={video.ownerDetails.username}
                                videoId={video._id}
                                createdAt={video.createdAt}
                                avatar={video.ownerDetails.avatar}
                            />
                        ))
                    ) : (
                        <div>No videos found</div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home
