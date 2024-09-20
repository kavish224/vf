import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { VideoCard } from '../components/VideoCard'
import axios from 'axios'
function Home() {
    const [video, setVideo] = useState([]);
    useEffect(()=>{
        const videos = async()=> {
            const video = await axios.get("http://65.2.190.212:8000/api/v1/video/")
            setVideo(video.data.data.docs);
        }
        videos()
    },[])
    return (
        <>
            <div className='p-4 bg-black'> 
                <NavBar/>
                </div>
            <div className='bg-black min-h-screen text-white p-4'>
            <div className='flex flex-wrap justify-center gap-4'>
                jjjjlkjmlkjlknh
                    {video.map(video => (
                        <VideoCard
                            key={video._id}
                            thumbUrl={video.thumbnail}
                            title={video.title}
                            views={video.views}
                            owner={video.ownerDetails.username}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
