export const NavBar = () => {
    return(
        <>
            <div className="text-white flex justify-between items-center shadow-sm shadow-[#ffffff] border-white bg-black rounded-full p-2
                            md:flex-row flex-col md:p-4 sm:space-x-4 space-x-0 space-y-2 md:space-y-0">
                <div className="ml-2 text-center text-lg">
                    Video Tube
                </div>
                <div className="hover:text-x cursor-pointer">
                    Home
                </div>
                <div className="hover:text-x cursor-pointer">
                    Subscribed
                </div>
                <div className="hover:text-x cursor-pointer">
                    Tweet
                </div>
                <div className="hover:text-x cursor-pointer">
                    Playlist
                </div>
                <div className=" hover:text-x cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </div>
                <div className="rounded-full h-12 w-12 hover:text-x cursor-pointer bg-black border-2 text-white flex justify-center drop-shadow-lg shadow-white  mr-2 ">
                    <div className="flex flex-col justify-center h-full text-xl">
                        K
                    </div>
                </div>
            </div>
        </>
    )
}