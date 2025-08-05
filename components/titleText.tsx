"use client";

import { title } from "./primitives";

export default function TitleText() {
  return (
    <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Making the switch from&nbsp;</span>
        <span className={title({ color: "green" })}>Spotify&nbsp;</span>
        <span className={title()}>to&nbsp;</span>
        <span className={title({ color: "pink" })}>Apple Music&nbsp;</span>
        <span className={title()}>is now a little bit easier.&nbsp;</span>
    </div>
  );
}
