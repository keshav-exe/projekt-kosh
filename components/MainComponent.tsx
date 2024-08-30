"use client";

import { useState, useEffect } from "react";
import ToggleNavbar from "@/components/ToggleNavbar";
import WalletGenerator from "@/components/WalletGenerator";

const MainComponent = () => {
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    setActiveIndex(pathTypes[pathTypes?.length - 1] === "501" ? 0 : 1);
  }, [pathTypes]);
  return (
    <>
      {pathTypes?.length > 0 && (
        <ToggleNavbar
          pathTypes={pathTypes}
          setPathTypes={setPathTypes}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      <WalletGenerator
        pathTypes={pathTypes}
        setPathTypes={setPathTypes}
        activeIndex={activeIndex}
      />
    </>
  );
};

export default MainComponent;
