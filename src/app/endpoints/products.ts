export const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://wdd-430-handcrafted-haven-kappa.vercel.app"
      }/api/products`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched products:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
