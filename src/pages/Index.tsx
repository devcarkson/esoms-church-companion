import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Ministries } from "@/components/site/Ministries";
import { Events } from "@/components/site/Events";
import { Parishes } from "@/components/site/Parishes";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatWidget } from "@/components/chat/ChatWidget";

const Index = () => {
  // Allow CTAs to open the chat widget via a custom event
  const [, force] = useState(0);
  useEffect(() => {
    const open = () => {
      // Programmatically click the floating chat button
      const btn = document.querySelector<HTMLButtonElement>('[aria-label="Open chat"]');
      btn?.click();
      force((n) => n + 1);
    };
    window.addEventListener("esoms:openChat", open);
    return () => window.removeEventListener("esoms:openChat", open);
  }, []);

  const openChat = () => window.dispatchEvent(new CustomEvent("esoms:openChat"));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero onOpenChat={openChat} />
        <About />
        <Services />
        <Ministries />
        <Events />
        <Parishes />
      </main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
};

export default Index;
