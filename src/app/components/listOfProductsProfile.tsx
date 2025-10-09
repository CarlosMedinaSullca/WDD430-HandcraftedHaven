'use client'
import Image from "next/image";


export default function Stories() {
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