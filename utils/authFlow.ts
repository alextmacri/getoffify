import { useSearchParams } from "next/navigation";
import { getAccessToken, refreshAccessToken } from "@/utils/spotifyAuth";
import { siteConfig } from "@/config/site";
import { fetchProfile } from "@/utils/spotifyAPI";

export async function authFlowUsername(spotifyAuthCode?: string): Promise<string | undefined> {
    if (spotifyAuthCode && localStorage.getItem("auth_code_unused") === "true") {
        await getAccessToken(siteConfig.clientId, spotifyAuthCode);
        localStorage.setItem("auth_code_unused", "false");
    }
    let userInfo = await getUserInfo();
    if (userInfo && userInfo.username) {
        localStorage.setItem("spotify_user_id", userInfo.userId);
        return userInfo.username;
    }

    // If that didn't work, refresh the token and try again 
    await refreshAccessToken(siteConfig.clientId);
    userInfo = await getUserInfo();
    if (userInfo && userInfo.username) {
        localStorage.setItem("spotify_user_id", userInfo.userId);
        return userInfo.username;
    }
}


async function getUserInfo(): Promise<{ username: string, userId: string } | undefined> {
    const token = localStorage.getItem("access_token");
    if (token) {
        try {
            const profile = await fetchProfile(token);
            if (profile.status === 200) {
                return {username: profile.body.display_name, userId: profile.body.id};
            }
        } catch (error) {
            console.error("Error fetching Spotify profile:", error);
        }
    }
}
