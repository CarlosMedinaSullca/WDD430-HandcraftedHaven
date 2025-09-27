export const fetchArtisans = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/artisans`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch artisans: ${res.status}`);
    }

    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return [];
  }
};
