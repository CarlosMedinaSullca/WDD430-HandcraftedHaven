"use client";

import Image from "next/image";
import { NavBar } from "../components/navBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
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

  // Product list (mock)
  function ListOfProducts() {
    return (
      <div className="border rounded-lg shadow-inner p-4 overflow-y-scroll no-scrollbar bg-white h-[40rem]">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          My Products
        </h2>
        <ul className="grid gap-6">
          <li className="border rounded-lg p-3 shadow hover:shadow-lg hover:scale-[1.02] transition">
            <p className="text-gray-900 font-medium">Sample Product</p>
            <Image
              src="https://cdn.pixabay.com/photo/2020/03/13/04/06/handmade-4926870_960_720.jpg"
              width={400}
              height={300}
              className="rounded-lg mt-2"
              alt="sample product"
            />
          </li>
        </ul>
      </div>
    );
  }

  // Stories (mock)
  function Stories() {
    return (
      <div className="border rounded-lg shadow-inner p-4 overflow-y-auto no-scrollbar bg-white h-[40rem]">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">My Stories</h2>
        <ul className="grid gap-6">
          <li className="border rounded-lg p-3 shadow hover:shadow-lg hover:scale-[1.02] transition">
            <p className="text-gray-700 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Image
              src="https://cdn.pixabay.com/photo/2015/08/20/21/52/straw-basket-898203_1280.jpg"
              width={400}
              height={300}
              className="rounded-lg"
              alt="sample story"
            />
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50">
        <Stories />
        <ListOfProducts />
      </div>
    </>
  );
}
