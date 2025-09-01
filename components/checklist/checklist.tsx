"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import {ScrollShadow} from "@heroui/scroll-shadow";

import TrackChecklistComponent from "./trackChecklistComponent";
import AlbumChecklistComponent from "./albumChecklistComponent";
import ArtistChecklistComponent from "./artistChecklistComponent";
import PlaylistChecklistComponent from "./playlistChecklistComponent";
import {
  LikedSongs,
  LikedAlbums,
  LikedArtists,
  YourPlaylists,
  SavedPlaylists
} from "@/components/icons";

export default function Checklist() {
  return (
    <>
      <div className="w-full">
        <p className="text-2xl font-semibold text-lef pb-4">Liked Songs:</p>
        <Accordion
          className="bg-default rounded-3xl shadow-lg shadow-default/60 px-6"
          itemClasses={{base: "py-2", title: "font-bold"}}
        >
          <AccordionItem key="allTracks" aria-label="Accordion All Tracks" startContent={<LikedSongs />} title="All Tracks">
            <ScrollShadow size={50} className="max-h-[70vh] overflow-y-auto">
              <TrackChecklistComponent />
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="albums" aria-label="Accordion Albums" startContent={<LikedAlbums />} title="Albums">
            <ScrollShadow size={50} className="max-h-[70vh] overflow-y-auto">
              <AlbumChecklistComponent />
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="artists" aria-label="Accordion Artists" startContent={<LikedArtists />} title="Artists">
            <ScrollShadow size={50} className="max-h-[70vh] overflow-y-auto">
              <ArtistChecklistComponent />
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full">
        <p className="text-2xl font-semibold text-lef pb-4">Playlists:</p>
        <Accordion
          className="bg-default rounded-3xl shadow-lg shadow-default/60 px-6"
          itemClasses={{base: "max-h-5/6 py-2", title: "font-bold"}}
        >
          <AccordionItem key="yourPlaylists" aria-label="Accordion Your Playlists" startContent={<YourPlaylists />} title="Your Playlists">
            <ScrollShadow size={50} className="max-h-[70vh] overflow-y-auto">
              <PlaylistChecklistComponent localStorageTracksKey="yourPlaylistTracks" localStorageChecklistKey="yourPlaylistChecklist" />
            </ScrollShadow>
          </AccordionItem>
          <AccordionItem key="savedPlaylists" aria-label="Accordion Saved Playlists" startContent={<SavedPlaylists />} title="Saved Playlists">
            <ScrollShadow size={50} className="max-h-[70vh] overflow-y-auto">
              <PlaylistChecklistComponent localStorageTracksKey="savedPlaylistTracks" localStorageChecklistKey="savedPlaylistChecklist" />
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
