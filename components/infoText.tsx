"use client";

export default function InfoText() {
  return (
    <>
      <div className="flex flex-col text-lg text-default-600 items-center text-center max-w-3/4 gap-4">
        <span>
          Securely sign in with your Spotify account, then getoffify will create a personalized checklist with
          everything you need tofinally make the switch.
        </span>
        <span className="text-sm opacity-60">
          Note: This is an open source, static web app. Your Spotify credentials and data are never sent anywhere.
          Don't trust me? Click the GitHub button in the navbar to see for yourself.
        </span>
      </div>
    </>
  );
}
