"use client";

import { ScrollShadow } from "@heroui/scroll-shadow";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { trackCollection } from "@/utils/checklistUtils";
import ChecklistCheckboxes from "./checklistCheckboxes";

interface CollectionAccordionProps {
    trackCollections: trackCollection[];
    isChecked: (key: string) => boolean;
    toggle: (key: string) => void;
}

export default function CollectionAccordion(collectionAccordionProps: CollectionAccordionProps) {
    const { trackCollections, isChecked, toggle } = collectionAccordionProps;

    return (
        <Accordion>
            {trackCollections.map((collection: trackCollection) => (
                <AccordionItem key={collection.id} aria-label={`Accordion ${collection.name}`} title={collection.name}>
                    <ChecklistCheckboxes tracks={collection.songs} isChecked={isChecked} toggle={toggle} />
                </AccordionItem>
            ))}
        </Accordion>
    )
}
