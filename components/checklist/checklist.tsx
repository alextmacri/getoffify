"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import {ScrollShadow} from "@heroui/scroll-shadow";

import { title } from "@/components/primitives";
import TrackChecklistComponent from "./trackChecklistComponent";
import {
  LikedSongs,
  LikedAlbums,
  LikedArtists,
  Playlists
} from "@/components/icons";

export default function Checklist() {
  return (
    <>
      <div className="w-full">
        <p className="text-2xl font-semibold text-lef pb-4">Liked Songs:</p>
        <Accordion
          selectionMode="multiple"
          className="bg-default rounded-3xl shadow-lg shadow-default/60 px-6"
          itemClasses={{base: "max-h-5/6 py-2", title: "font-bold"}}
        >
          <AccordionItem key="allTracks" aria-label="Accordion All Tracks" startContent={<LikedSongs />} title="All Tracks">
            <ScrollShadow>
              <TrackChecklistComponent />
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="albums" aria-label="Accordion Albums" startContent={<LikedAlbums />} title="Albums">
            <ScrollShadow>
              {/* <TrackChecklistComponent /> */}
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="artists" aria-label="Accordion Artists" startContent={<LikedArtists />} title="Artists">
            <ScrollShadow>
              {/* <TrackChecklistComponent /> */}
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full">
        <p className="text-2xl font-semibold text-lef pb-4">Playlists:</p>
        <Accordion
          selectionMode="multiple"
          className="bg-default rounded-3xl shadow-lg shadow-default/60 px-6"
          itemClasses={{base: "max-h-5/6 py-2", title: "font-bold"}}
        >
          <AccordionItem key="yourPlaylists" aria-label="Accordion Your Playlists" startContent={<Playlists />} title="Your Playlists">
            <ScrollShadow>
              {/* <TrackChecklistComponent /> */}
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="savedPlaylists" aria-label="Accordion Saved Playlists" startContent={<Playlists />} title="Saved Playlists">
            <ScrollShadow>
              {/* <TrackChecklistComponent /> */}
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
