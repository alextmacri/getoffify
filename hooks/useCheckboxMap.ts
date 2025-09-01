import { useEffect, useState, useCallback } from "react";

import { saveMapToLocalStorage, loadMapFromLocalStorage } from "@/utils/localStorageUtils";

export function useCheckboxMap() {
    const [checklistState, setChecklist] = useState<Map<string, boolean>>();

    const initialLoadChecklist = useCallback(() => {
        if (checklistState) return;
        const loadedChecklist = loadMapFromLocalStorage("trackChecklist");
        if (loadedChecklist) setChecklist(loadedChecklist);
    }, []);

    // Save changes to localStorage whenever the checklist state changes
    useEffect(() => {
        if (checklistState) saveMapToLocalStorage("trackChecklist", checklistState);
    }, [checklistState]);

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

    return { initialLoadChecklist, isChecked, toggle }
}
