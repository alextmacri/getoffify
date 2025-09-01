"use client";

import { Checkbox } from "@heroui/checkbox";
import { Card, CardBody } from "@heroui/card";

import { track } from "@/utils/checklistUtils";

interface ChecklistCheckboxesProps {
    tracks: track[];
    isChecked: (key: string) => boolean;
    toggle: (key: string) => void;
}

export default function ChecklistCheckboxes(checklistCheckboxesProps: ChecklistCheckboxesProps) {
    const { tracks, isChecked, toggle } = checklistCheckboxesProps;

    return (
        <>
            {tracks.map((track: track) => (
                track && track.id && track.name && (
                    <Checkbox
                        key={track.id}
                        value={track.id}
                        isSelected={isChecked(track.id)}
                        onChange={() => toggle(track.id)}
                        lineThrough
                        radius="full"
                        color="primary"
                        className="truncate block w-full my-0.5"
                    >
                        {track.name}
                    </Checkbox>
                )
            ))}
        </>
    )
}