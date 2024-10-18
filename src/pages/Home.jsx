import React, { useEffect } from "react";
import SpotifyUser from "../components/SpotifyUser";
import { storeToken } from "../api/storeToken";
import UserTracks from "@/components/UserTracks";
import useUserStore from "@/store/dataStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserArtists from "@/components/UserArtists";

const App = () => {
  const { user, setUser, tracks, setTracks, setArtists, artists, error } =
    useUserStore((state) => ({
      user: state.user,
      setUser: state.setUser,
      tracks: state.tracks,
      setTracks: state.setTracks,
      artists: state.artists,
      setArtists: state.setArtists,
      error: state.error,
    }));
  useEffect(() => {
    storeToken();
    setUser();
    setTracks();
    setArtists();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {error && <h1>{error}</h1>}
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
          {tracks ? <UserTracks /> : <Skeleton className="h-80 w-[350px]" />}
        </TabsContent>
        <TabsContent value="top_artists">
          {artists ? <UserArtists /> : <Skeleton className="h-80 w-[350px]" />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
