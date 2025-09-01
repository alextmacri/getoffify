"use client";

import { useEffect, useState } from "react";

import { useCheckboxContext } from "./checkboxProvider";
import { trackCollection } from "@/utils/checklistUtils";
import { loadObjectFromLocalStorage } from "@/utils/localStorageUtils";
import CollectionAccordion from "./collectionAccordion";

export default function ArtistChecklistComponent() {
    const [artists, setartists] = useState<trackCollection[]>([]);
    const { initialLoadChecklist, isChecked, toggle } = useCheckboxContext();

    useEffect(() => {
        const loadedartists = loadObjectFromLocalStorage("artistTracks");
        if (loadedartists) setartists(loadedartists as trackCollection[]);

        initialLoadChecklist();
    }, []);

    return (
        <CollectionAccordion trackCollections={artists} isChecked={isChecked} toggle={toggle} />
    )
}
