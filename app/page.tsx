import Navbar from "@/components/Navbar";
import WalletGenerator from "@/components/WalletGenerator";
import Iphone15Pro from "@/components/ui/iphone-15-pro";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      <Navbar />
      <div className="flex flex-row gap-4 w-full">
      <div className="w-full">
      <WalletGenerator />
      </div>
      <div className="relative w-full h-screen">
  <Iphone15Pro
    className="absolute top-2 right-4 scale-75 rotate-12"
    src="https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/6ekkCVg5Uyz5M73kW5.mp4?Expires=1739947823&Signature=KnAUceKI49tuMk1ckP-3qxORkr6bkTuS1Ob19rxh8dhsX7wkK1tRS5OuqM8wTa3a74ESNG6buKRb75g2uMAuOG0Qcpu864F0765NfEIEuLbf1i~2sR-Sd~N699MwnhuD439lk0iBFhqV7atbZWH0HJ2bJxRH~PbuUUFxY7ct4Hdt11UtGNfVhvt8nkR8ehC8-vTHvZlp-~wEDRX9biWLa~rnBaCEIwlXQe5WQ6v9mJ1X7wuowdR7UbKgYJhPoRWB99Uj20YdM-neLtdlBNC~wwtDpRd5A-WguCgP8Je4wyx426fJYAfviCwDdWIEQn9DaxBeuqH2AsSXgLl6PxiSBg__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001"
  />
</div>
</div>

    </main>
  );
}
