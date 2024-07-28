import React, { useState, useEffect } from "react";
import SpotifyUser from "../components/SpotifyUser";
import { storeToken } from "../api/storeToken";
import api from "../api/index";
import UserTracks from "@/components/UserTracks";
import useUserStore from "@/store/dataStore";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  const { user, setUser, tracks, setTracks } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    tracks: state.tracks,
    setTracks: state.setTracks,
  }));
  useEffect(() => {
    storeToken();
    setUser();
    setTracks();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {user ? <SpotifyUser /> : <Skeleton className="h-80 w-[350px]" />}
      {tracks ? <UserTracks /> : <Skeleton className="h-80 w-[350px]" />}
    </div>
  );
};

export default App;
