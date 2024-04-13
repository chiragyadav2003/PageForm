import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      Page Form App
      <UserButton/>
    </div>
  );
}
