import { useSearchParams } from "next/navigation";
import { getAccessToken, refreshAccessToken } from "@/utils/spotifyAuth";
import { siteConfig } from "@/config/site";
import { fetchProfile } from "@/utils/spotifyAPI";

export async function authFlowUsername(spotifyAuthCode?: string): Promise<string | undefined> {
    if (spotifyAuthCode && localStorage.getItem("auth_code_unused") === "true") {
        await getAccessToken(siteConfig.clientId, spotifyAuthCode);
        localStorage.setItem("auth_code_unused", "false");
    }
    const username = await getUsername();
    if (username) {
        return username;
    }
    await refreshAccessToken(siteConfig.clientId);
    return await getUsername();
}


async function getUsername(): Promise<string | undefined> {
    const token = localStorage.getItem("access_token");
    if (token) {
        try {
            const profile = await fetchProfile(token);
            if (profile.status === 200) {
                return profile.body.display_name;
            }
        } catch (error) {
            console.error("Error fetching Spotify profile:", error);
        }
    }
}
