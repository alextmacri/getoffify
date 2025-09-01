"use client";

import { useEffect, useState } from "react";

import { useCheckboxContext } from "./checkboxProvider";
import { track } from "@/utils/checklistUtils";
import { loadObjectFromLocalStorage } from "@/utils/localStorageUtils";
import ChecklistCheckboxes from "./checklistCheckboxes";

export default function TrackChecklistComponent() {
    const [tracks, setTracks] = useState<track[]>([]);
    const { initialLoadChecklist, isChecked, toggle } = useCheckboxContext();

    useEffect(() => {
        const loadedTracks = loadObjectFromLocalStorage("tracks");
        if (loadedTracks) setTracks(loadedTracks as track[]);

        initialLoadChecklist();
    }, []);

    return (
        <ChecklistCheckboxes tracks={tracks} isChecked={isChecked} toggle={toggle} />
    )
}
