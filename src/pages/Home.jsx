import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyUser from "@/components/SpotifyUser";
import TopItems from "@/components/TopItems";
import useUserStore from "@/store/dataStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleAuthCallback, isLoggedIn } from "@/lib/auth";

const Home = () => {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState(null);
  const user = useUserStore((state) => state.user);
  const userError = useUserStore((state) => state.userError);
  const fetchUser = useUserStore((state) => state.fetchUser);

  // Finish the Spotify redirect (if any), then require a session.
  useEffect(() => {
    let cancelled = false;
    handleAuthCallback()
      .then(() => {
        if (cancelled) return;
        if (!isLoggedIn()) {
          navigate("/", { replace: true });
          return;
        }
        setAuthReady(true);
      })
      .catch((error) => {
        if (!cancelled) setAuthError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (authReady) fetchUser();
  }, [authReady, fetchUser]);

  if (authError) {
    return (
      <div className="mt-20 flex flex-col items-center gap-4 text-center">
        <p className="text-destructive">{authError}</p>
        <Button onClick={() => navigate("/", { replace: true })}>
          Back to login
        </Button>
      </div>
    );
  }

  if (!authReady) {
    return (
      <div className="mt-10 flex justify-center">
        <Skeleton className="h-80 w-[350px]" />
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {userError && <p className="text-destructive">{userError}</p>}
      {user ? <SpotifyUser /> : <Skeleton className="h-80 w-[350px]" />}
      <Tabs
        defaultValue="top_tracks"
        className="flex flex-col items-center gap-4"
      >
        <TabsList>
          <TabsTrigger className="text-lg" value="top_tracks">
            Top Tracks
          </TabsTrigger>
          <TabsTrigger className="text-lg" value="top_artists">
            Top Artists
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top_tracks">
          <TopItems type="tracks" />
        </TabsContent>
        <TabsContent value="top_artists">
          <TopItems type="artists" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
