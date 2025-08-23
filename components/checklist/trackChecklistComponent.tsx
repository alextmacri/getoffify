"use client";

import { CheckboxGroup, Checkbox } from "@heroui/checkbox";

import { trackCollection, track } from "@/utils/checklistUtils";
import { loadObjectFromLocalStorage, loadMapFromLocalStorage } from "@/utils/localStorageUtils";


export default function TrackChecklistComponent() {
    const tracks: track[] = loadObjectFromLocalStorage("tracks")!;
    const trackChecklist: Map<string, boolean> = loadMapFromLocalStorage("trackChecklist")!;
    console.log("hi");

    return (
        <>
            {tracks[10].name}
        </>
    )
}
