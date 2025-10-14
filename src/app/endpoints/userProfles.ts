

export const fetchUserProfiles = async () => {
  try {
    const res = await fetch(`${
        "http://localhost:3000"
      }/api/user`,
      { cache: "no-store" }
    );
     if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }

    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return [];
  }
};

export const order66 = async () => {
  try {
    const res = await fetch(`${
        "http://localhost:3000"
      }/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.status}`);
    }

    const data = await res.json();
    console.log("New user created:", data);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
