import DailyCheckIn from "@/components/journey/DailyCheckIn";
import GuideMessage from "@/components/journey/GuideMessage";
import JourneyHero from "@/components/journey/JourneyHero";
import JourneyStats from "@/components/journey/JourneyStats";

export default function JourneyHomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">

      <div className="mx-auto max-w-7xl space-y-10">

        <JourneyHero />

        <DailyCheckIn />

        <GuideMessage />

        <JourneyStats />

      </div>

    </main>
  );
}