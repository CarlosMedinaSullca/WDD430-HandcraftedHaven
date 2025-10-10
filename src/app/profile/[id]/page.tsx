
import Stories from "@/app/components/stories"
import ListOfProducts from "@/app/components/listOfProductsProfile";
import ProfileElements from "@/app/components/profileElements";

export default function ProfilePage() {  

  return (
    <>
    <ProfileElements/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50">
        <Stories/>
        <ListOfProducts />
      </div>
    </>
  );
}
