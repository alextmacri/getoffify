"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";

import { trackCollection, track } from "@/utils/checklistUtils";
import { authFlowUsername } from "@/utils/authFlow";
import TitleText from "@/components/titleText";
import SignInButton from "@/components/signInButton";
import Checklist from "@/components/checklist/checklist";
import InfoText from "@/components/infoText";
import CreateChecklistButton from "@/components/checklist/createChecklistButton";
import DeleteChecklistButton from "@/components/checklist/deleteChecklistButton";
import { createChecklist, deleteChecklist } from "@/utils/checklistUtils";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [hasChecklist, setHasChecklist] = useState(false);
  const params = useSearchParams();
  const spotifyAuthCode = params ? params.get("code") : undefined;

  const loadTrackInfo = () => {
    setHasChecklist(localStorage.getItem('hasChecklist') === 'true');
  }

  const checklistCreateFunc = async () => {
    setLoading(true);
    try {
      await createChecklist();
      loadTrackInfo();
    } catch (error) {
      console.error("Error creating checklist:", error);
    } finally {
      setLoading(false);
    }
  }

  const checklistDeleteFunc = () => {
    deleteChecklist();
    setHasChecklist(false);
  }

  useEffect (() => {
    loadTrackInfo();

    authFlowUsername(spotifyAuthCode!).then((result) => {
      setUsername(result);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <TitleText />
      {isLoading ? <Spinner color="current" /> : (username ? <SignInButton username={username} /> : <SignInButton />)}
      {!isLoading && (hasChecklist ? <Checklist /> : (username ? <CreateChecklistButton checklistCreateFunc={checklistCreateFunc} /> : <InfoText />))}
      {!isLoading && hasChecklist && <DeleteChecklistButton checklistDeleteFunc={checklistDeleteFunc} />}
    </>
  );
}
