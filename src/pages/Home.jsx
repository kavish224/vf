import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { VideoCard } from '../components/VideoCard';
import axios from 'axios';
function Home() {
    const [video, setVideo] = useState([]);
    useEffect(() => {
        const videos = async () => {
            try {
                const video = await axios.get("https://vtapi.kavishambani.in/api/v1/video/");
                setVideo(video.data.data.docs);
                document.title = "VideoTube";
            } catch (error) {
                console.error("error in loading videos", error);
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
                    {video[0]?._id ? video.map(video => (
                        <VideoCard
                            key={video._id}
                            thumbUrl={video.thumbnail}
                            title={video.title}
                            views={video.views}
                            owner={video.ownerDetails.username}
                            videoId={video._id}
                        />
                    )) : "Error in Loading videos"}
                </div>
            </div>
        </>
    )
}

export default Home
