import React from "react";

export default function UserTracks() {
  const { track } = useUserStore((state) => ({
    track: state.track,
    setTrack: state.setTrack,
  }));

  useEffect(() => {
    setTrack();
  }, [setTrack]);

  return <div></div>;
}
