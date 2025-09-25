import { type LucideIcon } from "lucide-react";

interface TrendingCategoriesProp {
  categories: { name: string; icon: LucideIcon }[];
}

export default function TrendingCategories({
  categories,
}: TrendingCategoriesProp) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold mb-4 text-gray-900">
        Trending Categories
      </h1>
      <div className="flex gap-4 overflow-x-auto snap-x pb-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="p-5 rounded-2xl min-w-[160px] h-[200px] snap-center flex-shrink-0 flex flex-col items-center justify-between border border-gray-300 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-center w-[100px] aspect-square rounded-xl bg-gray-100">
                <Icon size={44} strokeWidth={1.5} className="text-teal-600" />
              </div>
              <p className="text-gray-800 mt-3 font-medium">{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
