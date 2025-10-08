export const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL ||
        "https://wdd-430-handcrafted-haven-kappa.vercel.app"
      }/api/categories`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
