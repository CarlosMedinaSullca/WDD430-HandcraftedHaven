"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { fetchProducts } from "../endpoints/products";

type CarrouselProps = {
  list: { name: string; src: string }[];
};

export default function Carrousel() {
  const [list, setList] = useState<{ name: string; small_picture: string }[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getProducts() {
      const products = await fetchProducts();
      setList(products);
    }
    getProducts();
  }, []);
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    carousel.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      carousel.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [list.length]);

  if (!list.length) return <div>Loading...</div>;
  console.log("products from page", list);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.scrollWidth / list.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, list.length - 1)));
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / list.length;
    carouselRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <div className="w-full sm:px-6">
      <div
        ref={carouselRef}
        className="flex gap-2  justify-around overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl relative min-w-[180px] h-[180px] snap-center flex-shrink-0"
          >
            <Image
              src={item.small_picture}
              alt={item.name}
              fill
              className="object-cover rounded-2xl"
              sizes="180px"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {list.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
