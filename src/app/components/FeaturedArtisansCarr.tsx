import Image from "next/image";

type FeaturedArtisansProps = {
  artisans: { name: string; src: string }[];
};

export default function FeaturedArtisans({ artisans }: FeaturedArtisansProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold mb-4 text-black">
        Featured Artisans
      </h1>
      <div className="flex gap-4 overflow-x-auto snap-x">
        {artisans.map((artisan, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl relative min-w-[180px] h-[220px] snap-center flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src={artisan.src}
                alt={`${artisan.name} portrait`}
                fill
                className="object-cover rounded-full border-2 border-[#CADEDF] shadow-md"
                sizes="120px"
              />
            </div>
            <p className="text-black mt-2 font-medium">{artisan.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
