import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
export const VideoCard = ({
    thumbUrl,
    title,
    views,
    owner,
    videoId,
    createdAt,
    avatar
}) => {
    const sinceUpload = () => {
        return createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Error in loading upload time"
    }
    return (
        <Link to={`/watch?v=${videoId}`} className="m-2 p-4 shadow-md shadow-x relative h-[350px] w-[300px] rounded-md cursor-pointer">
            <div className="h-[75%] w-full">
                <img src={thumbUrl} className="z-0 w-full h-full rounded-md object-cover" />
            </div>
            <div className="flex items-start">
                <div className="pt-3 pr-2.5">
                    <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
                </div>
                <div className="bottom-0 left-0 justify-between pt-2 text-white">
                    <div className="font-semibold pb-1 text-lg truncate">
                        {title}
                    </div>
                    <div className="flex items-center text-sm">
                        <span>{owner}</span>
                    </div>
                    <div className="text-xs">
                        <span>{sinceUpload()}</span>
                        <span> • </span>
                        <span>{views} views</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}