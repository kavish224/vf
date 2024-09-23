import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
export const SugVideoCard = ({
    thumbUrl,
    title,
    views,
    owner,
    videoId,
    createdAt
}) => {
    const sinceUpload = () => {
        return createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "Error in loading upload time"
    }
    return (
        <Link to={`/watch?v=${videoId}`} className="m-1 flex relative h-[150px] w-full rounded-md cursor-pointer" >
            <div className="h-full w-[50%]">
                <img src={thumbUrl} className="z-0 w-full h-full rounded-md object-cover" />
            </div>
            <div className="m-4">
                <div className="text-lg">
                    {title}
                </div>
                <div className="text-sm pt-1">
                    <div>
                        {owner}
                    </div>
                    <div>
                        <span>{views} views</span>
                        <span> • </span>
                        <span>{sinceUpload()}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}