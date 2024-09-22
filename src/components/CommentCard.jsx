import { formatDistanceToNow } from "date-fns"

export const CommentCard = ({
    avatar,
    fullname,
    createdAt,
    likes,
    content,
}) => {
    const sinceUpload = () => {
        return createdAt ? formatDistanceToNow(new Date(createdAt), {addSuffix: true}).replace('about ', '') : ""
    }
    return (
        <div className="flex p-2">
            <div>
                <img src={avatar} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex flex-col pl-4 p-1">
                <div className="flex items-baseline">
                    <div className="text-lg">
                        {fullname}
                    </div>
                    <div className="pl-2 text-xs">
                        {sinceUpload()}
                    </div>
                </div>
                <div>
                    {content}
                </div>
                <div className="p-1 flex items-center">
                    <div className="pr-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                    </div>
                    <div>
                        {likes}
                    </div>
                </div>
            </div>
        </div>

    )
}