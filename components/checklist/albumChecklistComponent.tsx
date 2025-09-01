"use client";

import { useEffect, useState } from "react";

import { useCheckboxContext } from "./checkboxProvider";
import { trackCollection } from "@/utils/checklistUtils";
import { loadObjectFromLocalStorage } from "@/utils/localStorageUtils";
import CollectionAccordion from "./collectionAccordion";

export default function AlbumChecklistComponent() {
    const [albums, setAlbums] = useState<trackCollection[]>([]);
    const { initialLoadChecklist, isChecked, toggle } = useCheckboxContext();

    useEffect(() => {
        const loadedAlbums = loadObjectFromLocalStorage("albumTracks");
        if (loadedAlbums) setAlbums(loadedAlbums as trackCollection[]);

        initialLoadChecklist();
    }, []);

    return (
        <CollectionAccordion trackCollections={albums} isChecked={isChecked} toggle={toggle} />
    )
}
