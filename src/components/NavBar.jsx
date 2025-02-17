import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [desktopProfDrop, setDesktopProfDrop] = useState(false);
    const [mobileProfDrop, setMobileProfDrop] = useState(false);
    const [, setAuth] = useRecoilState(authState)
    const currentUser = useRecoilValue(authState)
    const menuRef = useRef(null);
    const desktopProfRef = useRef(null);
    const mobileProfRef = useRef(null);
    const navigate = useNavigate();
    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDesktopProf = () => setDesktopProfDrop(!desktopProfDrop);
    const toggleMobileProf = () => setMobileProfDrop(!mobileProfDrop);

    // Handle clicks outside the menu and profile dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (desktopProfRef.current && !desktopProfRef.current.contains(event.target)) {
                setDesktopProfDrop(false);
            }
            if (mobileProfRef.current && !mobileProfRef.current.contains(event.target)) {
                setMobileProfDrop(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle logout
    const logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AWS_URL}/users/logout`, {}, { withCredentials: true });
            if (response.data.statusCode === 200) {
                setAuth({ isAuthenticated: false, user: {} });
                navigate("/logout");
            }
        } catch (error) {
            console.log(error);
            setAuth({ isAuthenticated: false, user: {} });
        }
    };

    return (
        <div className="text-white flex justify-between items-center shadow-md shadow-x border-white bg-black rounded-full p-4 md:flex-row relative" ref={menuRef}>
            <Link to="/" className="ml-2 text-center text-lg hover:text-x cursor-pointer">
                Video Tube
            </Link>
            <div className="md:hidden flex justify-end items-center">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M120-480v-60h720v60H120Zm0 240v-60h720v60H120Zm0-480v-60h720v60H120Z" />
                    </svg>
                </button>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
                <Link to="/" className="hover:text-x cursor-pointer">Home</Link>
                <div className="hover:text-x cursor-pointer">Subscribed</div>
                <div className="hover:text-x cursor-pointer">Tweet</div>
                <div className="hover:text-x cursor-pointer">Playlist</div>
                <div className="hover:text-x cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                </div>
                {currentUser.isAuthenticated ? (
                    <div className='relative' ref={desktopProfRef}>
                        <div className="rounded-full h-12 w-12 hover:text-x cursor-pointer bg-black border-2 text-white flex justify-center drop-shadow-lg shadow-white" onClick={toggleDesktopProf}>
                            <img className="rounded-full h-12 w-12" src={currentUser?.user?.avatar || 'https://avatars.githubusercontent.com/u/2452636?v=4'} alt="User Avatar" />
                        </div>
                        {desktopProfDrop && (
                            <div className='flex flex-col items-start absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-md shadow-x py-2 z-50'>
                                <Link to={"/profile"} className='p-3'>Profile</Link>
                                <button className='p-3' onClick={logout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="bg-x text-white px-4 py-2 rounded-lg" onClick={() => navigate("/signin")}>
                        Sign in
                    </button>
                )}
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-12 left-0 w-[90%] bg-black rounded-lg shadow-md shadow-x p-8 z-50">
                    <div className="flex flex-col space-y-4 items-center">
                        <Link to="/" className="hover:text-x cursor-pointer">Home</Link>
                        <div className="hover:text-x cursor-pointer">Subscribed</div>
                        <div className="hover:text-x cursor-pointer">Tweet</div>
                        <div className="hover:text-x cursor-pointer">Playlist</div>
                        <div className="hover:text-x cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                        </div>
                        {currentUser.isAuthenticated ? (
                            <div className='relative' ref={mobileProfRef}>
                                <div className="rounded-full h-12 w-12 hover:text-x cursor-pointer bg-black border-2 text-white flex justify-center drop-shadow-lg shadow-white" onClick={toggleMobileProf}>
                                    <img className="rounded-full h-12 w-12" src={currentUser.user.avatar || 'https://avatars.githubusercontent.com/u/2452636?v=4'} alt="User Avatar" />
                                </div>
                                {mobileProfDrop && (
                                    <div className='flex flex-col absolute items-start right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-md shadow-x py-2 z-50'>
                                        <Link to={"/profile"} className='p-3'>Profile</Link>
                                        <button className='p-3' onClick={logout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="bg-x text-white px-4 py-2 rounded-lg" onClick={() => navigate("/signin")}>
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
