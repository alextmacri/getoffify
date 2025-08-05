// Code from Spotify API documentation on Authorization Code Flow with PKCE
// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

import getBaseUrl from "@/utils/getBaseUrl";
import request from "@/utils/request";

export async function redirectToAuthCodeFlow(clientId: string) {
    const codeVerifier = generateCodeVerifier(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    window.localStorage.setItem("code_verifier", codeVerifier);

    localStorage.setItem("auth_code_unused", "true");

    const params =  {
        response_type: "code",
        client_id: clientId,
        scope: "user-read-private user-read-email",
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: getBaseUrl(),
    }

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}


export async function getAccessToken(clientId: string, code: string): Promise<number | undefined> {
    const codeVerifier = localStorage.getItem("code_verifier");
    
    const res = await request({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            code,
            code_verifier: codeVerifier!,
            redirect_uri: getBaseUrl(),
        }),
    });

    if (res && res.status === 200) {
        localStorage.setItem("access_token", res.body.access_token);
        localStorage.setItem("refresh_token", res.body.refresh_token);
    }
    
    return res?.status;
}


export async function refreshAccessToken(clientId: string): Promise<number | undefined> {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        return;
    }

    const res = await request({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientId,
            refresh_token: refreshToken!,
        }),
    });

    if (res && res.status === 200) {
        localStorage.setItem("access_token", res.body.access_token);
        localStorage.setItem("refresh_token", res.body.refresh_token);
    }
    
    return res?.status;
}


function generateCodeVerifier(length: number): string {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    return base64Encode(await window.crypto.subtle.digest("SHA-256", data));
}


function base64Encode(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
