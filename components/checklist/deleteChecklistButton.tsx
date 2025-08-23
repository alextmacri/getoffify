"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import { Modal, ModalContent, ModalHeader, ModalFooter } from "@heroui/modal";

export default function DeleteChecklistButton({ checklistDeleteFunc }: { checklistDeleteFunc: () => void }) {
    const [showModal, setShowModal] = useState(false);

    function handledeleteChecklist() {
        setShowModal(true);
    }

    function canceldeleteChecklist() {
        setShowModal(false);
    }

    return (
        <div className="flex gap-3">
            <Button
                className={buttonStyles({
                    color: "danger",
                    radius: "full",
                    variant: "ghost",
                    size: "lg",
                })}
                onPress={handledeleteChecklist}
            >
                Delete Checklist
            </Button>
            <Modal isOpen={showModal} onOpenChange={setShowModal} hideCloseButton={true} placement="center">
                <ModalContent>
                    <ModalHeader>
                        Delete the checklist? You will lose all progress.
                    </ModalHeader>
                    <ModalFooter>
                        <Button onPress={canceldeleteChecklist}>
                            Cancel
                        </Button>
                        <Button onPress={checklistDeleteFunc} color="danger">
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
