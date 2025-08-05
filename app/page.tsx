"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";

import { authFlowUsername } from "@/utils/authFlow";
import TitleText from "@/components/titleText";
import SignInButton from "@/components/signInButton";
import InfoText from "@/components/infoText";
import CreateChecklistButton from "@/components/createChecklistButton";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const params = useSearchParams();
  const spotifyAuthCode = params ? params.get("code") : undefined;

  useEffect (() => {
    authFlowUsername(spotifyAuthCode!).then((result) => {
      setUsername(result);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <TitleText />
      {isLoading ? <Spinner color="current" /> : username ? <SignInButton username={username} /> : <SignInButton />}
      {!isLoading && (username ? <CreateChecklistButton /> : <InfoText />)}
    </>
  );
}
