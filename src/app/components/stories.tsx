'use client'
import Image from "next/image";


export default function Stories() {
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