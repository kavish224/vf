import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import { SugVideoCard } from "../components/SugVideoCard"
import axios from "axios"
import { VideoCard } from "../components/VideoCard"

export const History = () => {
    const [his, setHis] = useState([]);
    useEffect(()=>{
        const history = async() => {
            const response = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/history`,{withCredentials:true});
            setHis(response.data.data);
            // console.log(his);
        }
        history()
    },[])
    return (
        <>
            <nav className="bg-black p-2">
                <NavBar />
            </nav>
            <div className="bg-black text-white flex">
            <div className="min-h-screen p-4 flex flex-col items-start">
                <h1 className="pb-4 text-3xl">Watch History</h1>
                {his.map(his=><SugVideoCard thumbUrl={his.thumbnail} title={his.title} views={his.views} owner={his.owner.username} videoId={his._id} createdAt={his.createdAt}/>)}
            </div>
            </div>
        </>
    )
}