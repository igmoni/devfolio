"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Spotify = () => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) {
          throw new Error("Failed to fetch Spotify data");
        }
        const data = await res.json();
        if (isMounted) setSong(data);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    // initial call
    fetchNowPlaying();

    // refresh every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const isOffline = !song || !song.isPlaying;
  const conatinerClass =
    "flex items-center gap-4 w-full space-x-3 p-3 rounded-md border transition-all bg-[#fbfbfb] text-primary dark:bg-primary dark:text-white shadow-acternity dark:shadow-acternity-white dark:border-2 shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]  dark:shadow-[inset_0_0_4px_rgba(255,255,255,0.5)] ";

  if (isOffline) {
    return (
      <Container className={conatinerClass}>
        <Image
          src={"/assets/spotify.svg"}
          alt="Spotify"
          width={48}
          height={48}
          className="rounded-md shrink-0"
        />

        <div className="flex flex-col min-w-0">
          <p className="text-secondary font-semibold text-sm truncate">
            Offline
          </p>
          <p className="text-secondary text-xs truncate">
            Not currently listening
          </p>
          <p className="text-secondary text-xs truncate">
            Music Activity unavailable
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Link href={song.spotifyUrl} target="_blank">
      <Container className={conatinerClass}>
        <Image
          src={song.albumImageUrl}
          alt={song.album}
          width={50}
          height={50}
          className="size-15 rounded-md shrink-0"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-gray-400 flex items-center gap-1 text-xs truncate">
            <span className="">
              <Image
                width={15}
                height={15}
                src={"/assets/spotify.svg"}
                alt="Spotify"
              />
            </span>{" "}
            Currently listening
          </p>
          <p className="font-semibold text-sm truncate">{song.title}</p>
          <p className="text-gray-400 text-xs truncate">by {song.artist}</p>
        </div>
      </Container>
    </Link>
  );
};

export default Spotify;
