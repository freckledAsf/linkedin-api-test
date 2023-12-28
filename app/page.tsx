"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const onClick = async () => {
    const res = await fetch("/api/linkedin");
    const data = await res.json();
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <h1 className="text-xl font-bold">Click to test!</h1>
      <Button {...{ onClick }}>Test</Button>
      <div className="flex flex-col gap-4 rounded-md p-12">
        
      </div>
    </main>
  );
}
