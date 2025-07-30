import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Making the switch from&nbsp;</span>
        <span className={title({ color: "green" })}>Spotify&nbsp;</span>
        <span className={title()}>to&nbsp;</span>
        <span className={title({ color: "pink" })}>Apple Music&nbsp;</span>
        <span className={title()}>is now a little bit easier.&nbsp;</span>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
            size: "lg",
          })}
          href="/"
        >
          Sign in with Spotify
        </Link>
      </div>

      <div className="flex flex-col text-lg text-default-600 items-center text-center max-w-3/4 gap-4">
        <span>
          Securely sign in with your Spotify account, then select the songs, playlists, albums, and artists you want to transfer.
          Getoffify will create a personalized checklist with everything you need to finally make the switch.
        </span>
        <span className="text-sm opacity-60">
          Note: This is an open source, static web app. Your Spotify credentials and data are never sent anywhere.
          Don't trust me? Click the GitHub button in the navbar to see for yourself.
        </span>
      </div>
    </section>
  );
}
