"use client";

import axios from "axios";
import { Profile } from "@/types";
import { useRef, useState, useTransition } from "react";
import ProfileCard from "@/components/ui/profileCard";
import SubmitButton from "@/components/ui/submitButton";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchData = async (linkedin_url: string) => {
    const data: Profile = await axios
      .post("/api/linkedin", {
        linkedin_url,
      })
      .then((res) => res.data);
    setProfiles((prev) => [...prev, data]);
  };

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <h1 className="text-xl font-bold">Click to test!</h1>
      <div className="flex gap-6 items-center">
        <label htmlFor="url">Linkedin url</label>
        <div>
          <Input
            id="url"
            type="text"
            placeholder="https://www.linkedin.com/in/yifenghan/"
            ref={inputRef}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <SubmitButton
          isLoading={isPending}
          disabled={isPending}
          className="font-bold w-32"
          onClick={() =>
            startTransition(() => {
              if (!inputRef.current?.value) {
                toast({
                  variant: "destructive",
                  title: "No linkedin url was specified",
                });
              } else {
                fetchData(inputRef.current.value);
              }
            })
          }
        >
          Test
        </SubmitButton>
        <Button
          onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(profiles));
              toast({
                title: "Profiles copied to clipboard.",
              });
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
              });
            }
          }}
        >
          <ClipboardCopyIcon className="mr-2 h-4 w-4" />
          Copy to clipboard
        </Button>
      </div>
      <div className="flex gap-6">
        {profiles.map((profile, i) => (
          <ProfileCard key={i} {...{ profile }} />
        ))}
      </div>
      <Toaster />
    </main>
  );
}
