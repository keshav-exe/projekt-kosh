import { ModeToggle } from "@/components/ui/theme-button";
import WalletGenerator from "@/components/walletGenerator";
import { Box } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 px-4 py-8 min-h-[92vh]">
      <nav className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Box className="size-8" />
        </div>
        <ModeToggle />
      </nav>
      <WalletGenerator />
      {/* <WalletManager /> */}
    </main>
  );
}
