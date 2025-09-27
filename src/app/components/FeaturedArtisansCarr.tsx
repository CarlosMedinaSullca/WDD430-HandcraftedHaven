import Image from "next/image";

interface Artisan {
  first_name: string;
  last_name: string;
  biography: string;
  email: string;
}
interface artisansProps {
  artisans: Artisan[];
}

export default function FeaturedArtisans({ artisans }: artisansProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold mb-4 text-black">
        Featured Artisans
      </h1>
      <div className="flex gap-4 overflow-x-auto snap-x">
        {artisans.slice(0, 3).map((artisan, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl relative min-w-[180px] h-[220px] snap-center flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-[120px] h-[120px]">
              <Image
                src="/user.png"
                alt={`${artisan.first_name} portrait`}
                fill
                className="object-cover rounded-full border-2 border-[#CADEDF] shadow-md"
                sizes="120px"
              />
            </div>
            <p className="text-black mt-2 font-medium">
              {artisan.first_name} {artisan.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
