import { Box } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ui/theme-button";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Box className="size-8" />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
            Kosh{" "}
            <span className="rounded-full text-base bg-primary/10 border border-primary/50 px-2">
              v1.3
            </span>
          </span>
        </div>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
