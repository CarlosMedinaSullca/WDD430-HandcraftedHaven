import Image from "next/image";
import Link from "next/link";
import LinkWithLoading from "./LinkWithLoading";

interface Artisan {
  _id: string;
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
    <div className="w-full sm:px-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-black">
          Featured Artisans
        </h1>
        <div className="flex gap-4 justify-around overflow-x-auto snap-x">
          {artisans.slice(0, 4).map((artisan, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl relative min-w-[180px] h-[220px] snap-center flex-shrink-0 flex flex-col items-center"
            >
              <Link
                className="relative w-[120px] h-[120px]"
                href={`/profile/${artisan._id}`}
              >
                <Image
                  src="/user.png"
                  alt={`${artisan.first_name} portrait`}
                  fill
                  className="object-cover rounded-full border-2 border-[#CADEDF] shadow-md"
                  sizes="120px"
                />
              </Link>
              <p className="text-black mt-2 font-medium">
                {artisan.first_name} {artisan.last_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
