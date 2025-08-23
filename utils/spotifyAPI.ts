import { request } from "./request";

export async function fetchProfile(token: string): Promise<any> {
    return await request({
        url: "https://api.spotify.com/v1/me",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function fetchPlaylists(token: string, limit: number, offset: number): Promise<any> {
    return await request({
        url: `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
}


export async function fetchPlaylistTracks(token: string, playlistId: string, limit: number, offset: number): Promise<any> {
    return await request({
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
}


export async function fetchAlbums(token: string, limit: number, offset: number): Promise<any> {
    return await request({
        url: `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
}


export async function fetchAlbumTracks(token: string, albumId: string, limit: number, offset: number): Promise<any> {
    return await request({
        url: `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
}


export async function fetchSavedTracks(token: string, limit: number, offset: number): Promise<any> {
    return await request({
        url: `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
}
