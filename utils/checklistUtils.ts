import { fetchAllPaginated, fetchAllPaginatedId } from "./fetchAllPaginated";
import {
    fetchPlaylists,
    fetchPlaylistTracks,
    fetchSavedTracks
} from "./spotifyAPI";
import { saveObjectToLocalStorage, saveMapToLocalStorage, removeFromLocalStorage } from "./localStorageUtils";

type APITrackObject = {
    track: {
        id: string;
        name: string;
        album: {
            id: string;
            name: string;
        };
        artists: {
            id: string;
            name: string;
        }[];
    };
};


export type track = {
    id: string;
    name: string;
};


export type trackCollection = {
    id: string;
    name: string;
    songs: track[];
};


export async function createChecklist() {
    const token = localStorage.getItem("access_token");
        if (token) {
            try {
                // The saved tracks, albums, and artists can be fetched together
                const savedTracks = await fetchAllPaginated(token, fetchSavedTracks, 50);
                if (!savedTracks) throw new Error("Failed to fetch saved tracks");
                const tracks = getTracksFromSavedTracks(savedTracks);
                const albumIdNameMap = getAlbumIdNameMapFromSavedTracks(savedTracks);
                const albumTracks = getAlbumTracks(savedTracks, albumIdNameMap);
                const artistIdNameMap = getArtistIdNameMapFromSavedTracks(savedTracks);
                const artistTracks = getArtistTracks(savedTracks, artistIdNameMap);

                // The playlists and their tracks must be fetched on their own
                const playlistIdNameMap = await getPlaylistIdNameMap(token);
                const playlistTracks = await getPlaylistTracks(token, playlistIdNameMap);

                // Saving the track and collection info to localStorage
                saveObjectToLocalStorage("tracks", tracks);
                saveObjectToLocalStorage("albumTracks", albumTracks);
                saveObjectToLocalStorage("playlistTracks", playlistTracks);
                saveObjectToLocalStorage("artistTracks", artistTracks);

                // Generating the checklists, saving to localStorage
                const trackChecklist = generateIdChecklistMap(tracks);
                const playlistChecklist = generateIdCollectionChecklistMap(playlistTracks);
                saveMapToLocalStorage("trackChecklist", trackChecklist);
                saveMapToLocalStorage("playlistChecklist", playlistChecklist);
                localStorage.setItem("hasChecklist", 'true');
            } catch (error) {
                console.error("Error fetching Spotify info:", error);
            }
        }
}


export async function deleteChecklist() {
    removeFromLocalStorage("tracks");
    removeFromLocalStorage("albumTracks");
    removeFromLocalStorage("playlistTracks");
    removeFromLocalStorage("artistTracks");
    removeFromLocalStorage("trackChecklist");
    removeFromLocalStorage("playlistChecklist");
    localStorage.removeItem("hasChecklist")
}


function getTracksFromSavedTracks(savedTracks: APITrackObject[]): track[] {
    const trackIdNames: track[] = [];
    savedTracks.forEach((trackObject: APITrackObject) => {
        if (trackObject.track.id && trackObject.track.name) {
            trackIdNames.push({ id: trackObject.track.id, name: trackObject.track.name });
        }
    });
    return trackIdNames;
}


function getAlbumIdNameMapFromSavedTracks(savedTracks: APITrackObject[]): Map<string, string> {
    const albumIdNames = new Map<string, string>();
    savedTracks.forEach((trackObject: APITrackObject) => {
        if (trackObject.track.id && trackObject.track.name && !albumIdNames.has(trackObject.track.album.id)) {
            albumIdNames.set(trackObject.track.album.id, trackObject.track.album.name);
        }
    });
    return albumIdNames;
}


function getAlbumTracks(savedTracks: APITrackObject[], albumIdNames: Map<string, string>): trackCollection[] {
    const albumIdTracks = new Map<string, { id: string; name: string }[]>();
    const albumTracks: trackCollection[] = [];
    savedTracks.forEach((trackObject: APITrackObject) => {
        if (trackObject.track.album.id && trackObject.track.id && trackObject.track.name) {
            if (!albumIdTracks.has(trackObject.track.album.id)) {
                albumIdTracks.set(trackObject.track.album.id, []);
            }
            albumIdTracks.get(trackObject.track.album.id)!.push({
                id: trackObject.track.id,
                name: trackObject.track.name
            });
        }
    });
    albumIdTracks.forEach((songs, albumId) => {
        const albumName = albumIdNames.get(albumId);
        if (albumName) {
            albumTracks.push({ id: albumId, name: albumName, songs });
        }
    });
    return albumTracks;
}


function getArtistIdNameMapFromSavedTracks(savedTracks: APITrackObject[]): Map<string, string> {
    const artistIdNames = new Map<string, string>();
    savedTracks.forEach((trackObject: APITrackObject) => {
        if (trackObject.track.id && trackObject.track.name && !artistIdNames.has(trackObject.track.artists[0].id)) {
            artistIdNames.set(trackObject.track.artists[0].id, trackObject.track.artists[0].name);
        }
    });
    return artistIdNames;
}


function getArtistTracks(savedTracks: APITrackObject[], artistIdNames: Map<string, string>): trackCollection[] {
    const artistIdTracks = new Map<string, { id: string; name: string }[]>();
    const artistTracks: trackCollection[] = [];
    savedTracks.forEach((trackObject: APITrackObject) => {
        if (trackObject.track.artists[0].id && trackObject.track.id && trackObject.track.name) {
            if (!artistIdTracks.has(trackObject.track.artists[0].id)) {
                artistIdTracks.set(trackObject.track.artists[0].id, []);
            }
            artistIdTracks.get(trackObject.track.artists[0].id)!.push({
                id: trackObject.track.id,
                name: trackObject.track.name
            });
        }
    });
    artistIdTracks.forEach((songs, artistId) => {
        const artistName = artistIdNames.get(artistId);
        if (artistName) {
            artistTracks.push({ id: artistId, name: artistName, songs });
        }
    });
    return artistTracks;
}


async function getPlaylistIdNameMap(token: string): Promise<Map<string, string>> {
    const playlists = await fetchAllPaginated(token, fetchPlaylists, 50);
    if (!playlists) throw new Error("Failed to fetch playlists");

    const playlistIdNames = new Map<string, string>();
    playlists.forEach((playlist: { id: string; name: string; }) => {
        if (playlist.id && playlist.name) {
            playlistIdNames.set(playlist.id, playlist.name);
        }
    });
    return playlistIdNames;
}


async function getPlaylistTracks(token: string, playlistIdNames: Map<string, string>): Promise<trackCollection[]> {
    const playlistPromises = Array.from(playlistIdNames.entries()).map(async ([playlistId, playlistName]) => {
        const tracks = await fetchAllPaginatedId(token, fetchPlaylistTracks, playlistId, 50);
        if (!tracks) throw new Error("Failed to fetch tracks for playlist " + playlistName);

        const songs = tracks.map((trackObject: APITrackObject) => (trackObject.track && {
            id: trackObject.track.id,
            name: trackObject.track.name
        }));

        return { id: playlistId, name: playlistName, songs };
    });

    return Promise.all(playlistPromises);
}


function generateIdChecklistMap(items: { id: string }[]): Map<string, boolean> {
    const idNameMap = new Map<string, boolean>();
    items.forEach((item) => {
        if (item.id) {
            idNameMap.set(item.id, false);
        }
    });
    return idNameMap;
}


function generateIdCollectionChecklistMap(items: trackCollection[]): Map<string, Map<string, boolean>> {
    const idCollectionMap = new Map<string, Map<string, boolean>>();
    items.forEach((item) => {
        if (item.id) {
            idCollectionMap.set(item.id, generateIdChecklistMap(item.songs));
        }
    });
    return idCollectionMap;
}
