import Navbar from "@/components/Navbar";
import MainComponent from "@/components/MainComponent";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      <Navbar />
      <MainComponent />
    </main>
  );
}
