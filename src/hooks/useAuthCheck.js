import { useRecoilState } from "recoil"
import { authState } from "../recoil/authAtom"
import { useEffect } from "react";
import axios from "axios";

export const useAuthCheck = () => {
    const [auth, setAuth] = useRecoilState(authState);
    useEffect(()=>{
        const checkAuth = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AWS_URL}/users/curr-user`,{
                    withCredentials: true,
                });
                if (response.data.statuscode === 200 && response.data.user) {
                    setAuth({
                        isAuthenticated: true,
                        user: response.data.user,
                    });
                } else {
                    setAuth({
                        isAuthenticated:false,
                        user: null,
                    });
                }   
            } catch (error) {
                console.error("User not authenticated: ", error);
                setAuth({
                    isAuthenticated:false,
                    user: null,
                })
            }
        }
        checkAuth();
    }, [setAuth]);
    return auth;
}