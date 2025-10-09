'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function profileElements() {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") return <p>Loading...</p>;

    // MyProducts button
      function MyProducts({ userId }: { userId: string }) {
        return (
          <button
            onClick={() => router.push(`/products?owner=${userId}`)}
            className="absolute bottom-5 right-10 bg-green-500 px-5 py-2 rounded-lg text-white font-medium shadow hover:bg-green-600 hover:scale-105 transition"
          >
            My Products
          </button>
        );
      }


    return (
         <div className="relative bg-[url('https://cdn.pixabay.com/photo/2022/04/21/14/31/pottery-7147634_960_720.jpg')] h-[30rem] w-full bg-cover bg-center">
        <div className="absolute bottom-10 left-10 flex flex-col items-center bg-black/40 text-white p-4 rounded-lg shadow">
          <Image
            src="https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_1280.jpg"
            width={150}
            height={150}
            className="rounded-full border-4 border-purple-300"
            alt="profile picture"
          />
          <h1 className="text-xl mt-3">
            Welcome <span className="font-semibold">{session?.user?.name}</span>
          </h1>
          <p className="opacity-90">Role: {session?.user?.role}</p>
        </div>
        <MyProducts userId={session?.user?.id || ""} />
      </div>
    );
}


      