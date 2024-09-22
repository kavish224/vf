import { useNavigate } from "react-router-dom";
export const SugVideoCard = ({
    thumbUrl,
    title,
    views,
    owner,
    videoId
}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/watch?v=${videoId}`);
    };
    return(
        <div className="m-1 flex shadow-md shadow-x relative h-[150px] w-full rounded-md cursor-pointer" onClick={handleCardClick}>
            <div className="h-full w-[50%]">
            <img src={thumbUrl}  className="z-0 w-full h-full rounded-md object-cover"/>
            </div>
            <div className="m-4">
                <div className="text-lg">
                    {title}
                </div>
                <div className="text-sm text-">
                    <div>
                        {owner}
                    </div>
                    <div>
                        {views} views
                    </div>
                </div>
            </div>
        </div>
    )
}