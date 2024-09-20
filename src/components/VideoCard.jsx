export const VideoCard = ({
    thumbUrl,
    title,
    views,
    owner
}) => {
    return(
        <>
        <div className="m-2 p-4 shadow-md shadow-x relative h-[350px] w-[300px] rounded-md">
            <div className="h-[80%] w-full">
            <img src={thumbUrl}  className="z-0 w-full h-full rounded-md object-cover"/>
            </div>
            <div className="absolute bottom-0 left-0 justify-between p-4 z-10 text-white">
                <div className="font-semibold text-lg mb-2 truncate">
                    {title}
                </div>
                <div className="flex justify-between items-center text-sm">
                <span className="mr-2">{owner}</span>
                <span>•</span>
                <span className="ml-2">{views} views</span>
                </div>
            </div>
        </div>
    </>
    )
}