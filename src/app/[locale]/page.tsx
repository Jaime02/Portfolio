"use client";

import ProfileContent from "@/components/misc/ProfileContent";
import dynamic from "next/dynamic";
const ContentTabs = dynamic(() => import('@/components/thumbnails-tabs/ContentTabs'), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="mx-auto pb-4 sm:mt-[30px] md:max-w-3xl lg:max-w-4xl" role="main">
      <ProfileContent />
      <ContentTabs/>
    </main>
  );
}
