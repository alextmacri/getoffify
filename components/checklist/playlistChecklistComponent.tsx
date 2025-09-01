"use client";

import { useCallback, useEffect, useState } from "react";

import { trackCollection } from "@/utils/checklistUtils";
import { loadMapFromLocalStorage, loadObjectFromLocalStorage } from "@/utils/localStorageUtils";
import CollectionAccordion from "./collectionAccordion";

interface PlaylistChecklistComponentProps {
    localStorageTracksKey: string;
    localStorageChecklistKey: string;
}

export default function PlaylistChecklistComponent(playlistChecklistComponentProps: PlaylistChecklistComponentProps) {
    const { localStorageTracksKey, localStorageChecklistKey } = playlistChecklistComponentProps;
    const [playlists, setPlaylists] = useState<trackCollection[]>([]);
    const [checklistState, setChecklist] = useState<Map<string, boolean>>();

    // Constant time helper function to see if song has been checked
    const isChecked = useCallback((key: string) => {
        // Cast to boolean so it doesn't think it could be undefined (it can't this way anyways...)
        return (checklistState && !!checklistState.get(key)) as boolean;
    }, [checklistState]);

    // Constant time (?) helper function to toggle a song as checked
    const toggle = useCallback((key: string) => {
        setChecklist((prev: Map<string, boolean> | undefined) => {
            if (!prev) return;
            // Need to make a new map to get a new object reference so React sees it as an update and re-trigger a render.
            // This is a shallow copy, which is a constant-time operation (as far as I can tell)
            const newMap = new Map(prev);
            newMap.set(key, !newMap.get(key));
            return newMap;
        })
    }, []);

    useEffect(() => {
        const loadedPlaylists = loadObjectFromLocalStorage(localStorageTracksKey);
        if (loadedPlaylists) setPlaylists(loadedPlaylists as trackCollection[]);

        const loadedChecklist = loadMapFromLocalStorage(localStorageChecklistKey);
        if (loadedChecklist) setChecklist(loadedChecklist);
    }, []);

    return (
        <CollectionAccordion trackCollections={playlists} isChecked={isChecked} toggle={toggle} />
    )
}
