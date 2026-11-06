import { useEffect, useState } from "react";
import useUserStore, {
  DEFAULT_TIME_RANGE,
  TIME_RANGES,
} from "@/store/dataStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Normalizes a Spotify track or artist into what the grid shows.
const toCard = {
  tracks: (track) => ({
    id: track.id,
    name: track.name,
    subtitle: track.artists?.map((artist) => artist.name).join(", "),
    image: track.album?.images?.[0]?.url,
    url: track.external_urls?.spotify,
  }),
  artists: (artist) => ({
    id: artist.id,
    name: artist.name,
    subtitle: artist.genres?.join(", "),
    image: artist.images?.[0]?.url,
    url: artist.external_urls?.spotify,
  }),
};

const ItemCard = ({ item, position }) => (
  <div className="flex flex-col items-center gap-4 mb-8">
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {item.image ? (
        <img
          className="w-60 h-60 object-cover"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      ) : (
        <div className="w-60 h-60 flex items-center justify-center bg-muted text-muted-foreground">
          No image
        </div>
      )}
    </a>
    <div className="text-center max-w-60">
      <h3 className="text-lg font-semibold">
        {position}. {item.name}
      </h3>
      {item.subtitle && (
        <p className="text-sm text-slate-500">{item.subtitle}</p>
      )}
    </div>
  </div>
);

const RangeContent = ({ slot, title, type }) => {
  if (!slot || slot.loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={i} className="w-60 h-72" />
        ))}
      </div>
    );
  }
  if (slot.error) {
    return <p className="text-center text-destructive">{slot.error}</p>;
  }
  if (slot.items.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Not enough listening data for this period yet.
      </p>
    );
  }
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {slot.items.map((raw, index) => {
          const item = toCard[type](raw);
          return <ItemCard key={item.id} item={item} position={index + 1} />;
        })}
      </div>
    </>
  );
};

// type: "tracks" | "artists"
export default function TopItems({ type }) {
  const [range, setRange] = useState(DEFAULT_TIME_RANGE);
  const slots = useUserStore((state) => state.top[type]);
  const fetchTop = useUserStore((state) => state.fetchTop);

  useEffect(() => {
    fetchTop(type, range);
  }, [fetchTop, type, range]);

  return (
    <div className="flex flex-col items-center gap-4 mb-20">
      <Tabs
        value={range}
        onValueChange={setRange}
        className="flex flex-col items-center gap-4"
      >
        <TabsList>
          {TIME_RANGES.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {TIME_RANGES.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <RangeContent slot={slots[tab.value]} title={tab.title} type={type} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
