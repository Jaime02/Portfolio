import GroupsLayout from "@/components/histories/GroupsLayout";
import ThisWebsite from "@/app/(histories)/projects/ThisWebsite";
import TechnicalDrawingApp from "@/app/(histories)/projects/TechnicalDrawingApp";

export default function Page() {
  return (
    <GroupsLayout historyCardsLayouts={[
      <ThisWebsite />,
      <TechnicalDrawingApp />
    ]} />
  );
}