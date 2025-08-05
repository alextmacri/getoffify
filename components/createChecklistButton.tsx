"use client";

import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";

export default function CreateChecklistButton() {
  return (
        <div className="flex gap-3">
            <Button
                className={buttonStyles({
                    color: "default",
                    radius: "full",
                    variant: "shadow",
                    size: "lg",
                })}
                onPress={console.log.bind(null, "Create Checklist Button Pressed")}
            >
                Create Checklist
            </Button>
        </div>
  );
}
