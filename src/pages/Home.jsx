import React, { useEffect } from "react";
import SpotifyUser from "../components/SpotifyUser";
import { storeToken } from "../api/storeToken";
import UserTracks from "@/components/UserTracks";
import useUserStore from "@/store/dataStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserArtists from "@/components/UserArtists";

const App = () => {
  const { user, setUser, tracks, setTracks, setArtists, artists } =
    useUserStore((state) => ({
      user: state.user,
      setUser: state.setUser,
      tracks: state.tracks,
      setTracks: state.setTracks,
      artists: state.artists,
      setArtists: state.setArtists,
    }));
  useEffect(() => {
    storeToken();
    setUser();
    setTracks();
    setArtists();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {user ? <SpotifyUser /> : <Skeleton className="h-80 w-[350px]" />}
      <Tabs className="flex flex-col items-center gap-4">
        <TabsList>
          <TabsTrigger className="text-lg" value="top_tracks">
            Top Tracks
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="top_artists">
            Top Artists
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top_tracks">
          <UserTracks />
        </TabsContent>
        <TabsContent value="top_artists">
          <UserArtists />
        </TabsContent>
      </Tabs>
      {/* {tracks ? (
        <UserTracks />
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
      )} */}
    </div>
  );
};

export default App;
