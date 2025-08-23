"use client";

import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";

export default function CreateChecklistButton({ checklistCreateFunc }: { checklistCreateFunc: () => void }) {
    return (
        <div className="flex gap-3">
            <Button
                className={buttonStyles({
                    radius: "full",
                    variant: "shadow",
                    size: "lg",
                })}
                onPress={checklistCreateFunc}
            >
                Create Checklist
            </Button>
        </div>
    );
}
