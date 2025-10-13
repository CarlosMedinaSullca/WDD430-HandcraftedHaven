// app/my-products/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyProductsClient from "./components/MyProductsClient";
export default async function MyProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "seller") {
    redirect("/");
  }

  return <MyProductsClient session={session} />;
}
