import Image from "next/image";

export function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Image
        src="/logo.png"
        alt="Company Logo"
        className="h-8 w-auto"
        width={250}
        height={100}
      />
    </div>
  );
}
