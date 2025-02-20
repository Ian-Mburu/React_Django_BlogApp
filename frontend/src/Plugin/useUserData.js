import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function useUserData() {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!access_token || !refresh_token) {
        return null;
    }

    try {
        return jwtDecode(access_token); // Decode access token instead of refresh
    } catch (error) {
        console.error("Token decoding error:", error);
        return null;
    }
}

export default useUserData;