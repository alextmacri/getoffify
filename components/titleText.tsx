"use client";

import { title } from "./primitives";

export default function TitleText() {
  return (
    <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Get your music from&nbsp;</span>
        <span className={title({ color: "green" })}>Spotify&nbsp;</span>
        <span className={title()}>and take them&nbsp;</span>
        <span className={title({ color: "pink" })}>back.&nbsp;</span>
    </div>
  );
}
