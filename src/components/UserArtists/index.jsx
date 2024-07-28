import useUserStore from "@/store/dataStore";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArtistItem = ({ artist }) => (
  <div className="flex flex-col items-center gap-4 mb-8">
    <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
      <img
        className="w-60 h-60 object-cover"
        src={artist.images[0].url}
        alt={artist.name}
      />
    </a>
    <div className="text-center">
      <h3 className="text-lg font-semibold">{artist.name}</h3>
      <h3 className="text-sm text-gray-500">{artist.genres.join(", ")}</h3>
    </div>
  </div>
);

const renderTabContent = (timeRange, title, artists) => (
  <TabsContent value={timeRange}>
    <h1 className="text-center text-2xl font-bold mb-8">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {artists.items &&
        artists.items.map((artist, index) => (
          <ArtistItem artist={artist} key={index} />
        ))}
    </div>
  </TabsContent>
);

const tabs = [
  { timeRange: "short_term", title: "4 Weeks" },
  { timeRange: "medium_term", title: "6 Months" },
  { timeRange: "long_term", title: "1 Year" },
];

export default function UserArtists() {
  const { artists, setArtists } = useUserStore((state) => ({
    artists: state.artists,
    setArtists: state.setArtists,
  }));

  useEffect(() => {
    setArtists();
    console.log(artists);
  }, [setArtists]);

  return (
    <div className="flex flex-col items-center gap-4 mb-20">
      <Tabs className="flex flex-col items-center gap-4">
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.timeRange}
              onClick={() => setArtists(tab.timeRange)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => renderTabContent(tab.timeRange, tab.title, artists))}
      </Tabs>
    </div>
  );
}
