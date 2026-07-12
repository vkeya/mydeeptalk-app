import JourneyDashboard from "@/components/journey/JourneyDashboard";
import { JourneyProvider } from "@/context/JourneyProvider";

export default function JourneyDashboardPage() {
  return (
    <JourneyProvider>
      <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <JourneyDashboard />
        </div>
      </main>
    </JourneyProvider>
  );
}