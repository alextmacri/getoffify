"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import { Modal, ModalContent, ModalHeader, ModalFooter } from "@heroui/modal";

import { siteConfig } from "@/config/site";
import { redirectToAuthCodeFlow } from "@/utils/spotifyAuth";
import getBaseUrl from "@/utils/getBaseUrl";

export default function SignInButton({ username }: { username?: string }) {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function handleSignOut() {
        setShowModal(true);
    }

    function confirmSignOut() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("spotify_user_id");
        window.location.href = getBaseUrl();
    }

    function cancelSignOut() {
        setShowModal(false);
    }

    return (
        <div className="flex gap-3">
            <Button
                className={buttonStyles({
                    color: hovered && username ? "danger" : "success",
                    radius: "full",
                    variant: username ? "ghost" : "shadow",
                    size: "lg",
                })}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onPress={username ? handleSignOut : redirectToAuthCodeFlow.bind(null, siteConfig.clientId)}
            >
                {username ? "Signed in as " + username : "Sign in with Spotify"}
            </Button>
            <Modal isOpen={showModal} onOpenChange={setShowModal} hideCloseButton={true} placement="center">
                <ModalContent>
                    <ModalHeader>
                        Sign out of Spotify?
                    </ModalHeader>
                    <ModalFooter>
                        <Button onPress={cancelSignOut}>
                            Cancel
                        </Button>
                        <Button onPress={confirmSignOut} color="danger">
                            Sign out
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
