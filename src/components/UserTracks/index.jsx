import useUserStore from "@/store/dataStore";
import React, { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

export default function UserTracks() {
  const { tracks, setTracks } = useUserStore((state) => ({
    tracks: state.tracks,
    setTracks: state.setTracks,
  }));

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-8">Top Tracks</h1>
      <div className="flex flex-col items-center gap-4 mb-20 mt-8">
        <div className="flex items-center justify-center gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Top Tracks
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Top Artists
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Top Genres
          </button>
        </div>
        <div className=" flex items-center justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setTracks("short_term")}
          >
            Most Recent
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setTracks()}
          >
            6 months
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setTracks("long_term")}
          >
            All time
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tracks.items ? (
          tracks.items.map((track, index) => {
            return (
              <div
                className="flex flex-col items-center gap-4 mb-8"
                key={index}
              >
                <img
                  className="w-60 h-60 object-cover"
                  src={track.album.images[0].url}
                  alt={track.name}
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{track.name}</h3>
                  <h3 className="text-sm text-gray-600">
                    {track.artists[0].name}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center flex-col gap-4">
            <div className="flex items-center flex-col gap-4">
              <Skeleton className="w-60 h-60 " />
              <div className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center flex-col gap-4">
              <Skeleton className="w-60 h-60 " />
              <div className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center flex-col gap-4">
              <Skeleton className="w-60 h-60 " />
              <div className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
