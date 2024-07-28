import useUserStore from "@/store/dataStore";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrackItem = ({ track }) => (
  <div className="flex flex-col items-center gap-4 mb-8">
    <img
      className="w-60 h-60 object-cover"
      src={track.album.images[0].url}
      alt={track.name}
    />
    <div className="text-center">
      <h3 className="text-lg font-semibold">{track.name}</h3>
      <h3 className="text-sm text-slate-500">{track.artists[0].name}</h3>
    </div>
  </div>
);

const renderTabContent = (timeRange, title, tracks) => (
  <TabsContent value={timeRange}>
    <h1 className="text-center text-2xl font-bold mb-8">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {tracks.items &&
        tracks.items.map((track, index) => (
          <TrackItem track={track} key={index} />
        ))}
    </div>
  </TabsContent>
);

export default function UserTracks() {
  const { tracks, setTracks } = useUserStore((state) => ({
    tracks: state.tracks,
    setTracks: state.setTracks,
  }));

  const tabs = [
    { timeRange: "short_term", title: "4 Weeks" },
    { timeRange: "medium_term", title: "6 Months" },
    { timeRange: "long_term", title: "1 Year" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mb-20">
      <Tabs className="flex flex-col items-center gap-4">
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.timeRange}
              onClick={() => setTracks(tab.timeRange)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => renderTabContent(tab.timeRange, tab.title, tracks))}
      </Tabs>
    </div>
  );
}
