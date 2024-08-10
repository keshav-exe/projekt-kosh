import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="max-w-7xl mx-auto border-t bottom-0">
      <div className="flex justify-between py-4">
        <p className="text-primary/75 tracking-tighter text-sm">
          Designed and Developed by{" "}
          <Link href={"https://keshavbagaade.com"} className="font-bold">
            Keshav
          </Link>
        </p>
        <p className="text-primary/75 tracking-tighter text-sm">Made with ❤️</p>
      </div>
    </section>
  );
};

export default Footer;
