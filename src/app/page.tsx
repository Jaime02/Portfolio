"use client";

import ProfileContent from "@/components/misc/ProfileContent";
import ContentTabs from "@/components/thumbnails-tabs/ContentTabs";

export default function Page() {
  return (
    <main className="mx-auto sm:mt-[30px] md:max-w-3xl lg:max-w-4xl">
      <ProfileContent />
      <ContentTabs/>
    </main>
  );
}
