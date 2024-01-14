"use client";

import axios from "axios";
import { Profile as RapidAPIProfile } from "@/types/RapidAPI";
import { Profile as IScraperProfile } from "@/types/IScraper";
import { useRef, useState, useTransition } from "react";
import ProfileCard from "@/components/ui/profileCard";
import SubmitButton from "@/components/ui/submitButton";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [rapidAPIprofiles, setRapidAPIProfiles] = useState<RapidAPIProfile[]>(
    []
  );
  const [iScraperProfiles, setIScraperProfiles] = useState<IScraperProfile[]>(
    []
  );
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchRapidAPI = async (linkedin_url: string) => {
    const data: RapidAPIProfile = await axios
      .post("/api/rapidapi", {
        linkedin_url,
      })
      .then((res) => res.data);
    setRapidAPIProfiles((prev) => [...prev, data]);
  };

  const fetchIScraper = async (profile_id: string) => {
    const data = await axios
      .post("/api/iscraper", {
        profile_id,
      })
      .then((res) => res.data);
    setIScraperProfiles((prev) => [...prev, data]);
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
      <div className="flex gap-6 items-center">
        <SubmitButton
          isLoading={isPending}
          disabled={isPending}
          className="font-bold w-32"
          onClick={() => {
            if (!inputRef.current?.value) {
              toast({
                variant: "destructive",
                title: "No linkedin url was specified",
              });
            } else {
              const array = inputRef.current.value.split(" ");
              startTransition(() => {
                const interval = setInterval(() => {
                  const batch = array.splice(0, 10);
                  batch.map((link) => fetchRapidAPI(link));
                  if (array.length <= 0) clearInterval(interval);
                }, 60 * 1000);
              });
            }
          }}
        >
          RapidAPI
        </SubmitButton>
        <SubmitButton
          isLoading={isPending}
          disabled={isPending}
          className="font-bold w-32"
          onClick={() => {
            if (!inputRef.current?.value) {
              toast({
                variant: "destructive",
                title: "No linkedin url was specified",
              });
            } else {
              const array = inputRef.current.value.split(" ");
              startTransition(() => {
                const interval = setInterval(() => {
                  const batch = array.splice(0, 10);
                  batch.map((link) => {
                    const array = link.split("/");
                    fetchIScraper(array[array.length - 1]);
                  });
                  if (array.length <= 0) clearInterval(interval);
                }, 60 * 1000);
              });
            }
          }}
        >
          iScrapper
        </SubmitButton>
        <Button
          onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(rapidAPIprofiles));
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
          Copy RapidAPI profiles
        </Button>
        <Button
          onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(iScraperProfiles));
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
          Copy iScraper profiles
        </Button>
        <p className="font-semibold">
          {rapidAPIprofiles.length} profiles processed
        </p>
      </div>
      <div className="flex gap-6 flex-wrap">
        <p className="font-bold">RapidAPI:</p>
        {rapidAPIprofiles.map((profile, i) => (
          <ProfileCard
            key={i}
            imageUrl={profile.profile_image_url}
            fullName={profile.full_name}
          />
        ))}
      </div>
      <div className="flex gap-6 flex-wrap">
        <p className="font-bold">IScraper:</p>
        {iScraperProfiles.map((profile, i) => (
          <ProfileCard
            key={i}
            imageUrl={profile.profile_picture}
            fullName={`${profile.first_name} ${profile.last_name}`}
          />
        ))}
      </div>
      <Toaster />
    </main>
  );
}
