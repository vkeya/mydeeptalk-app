import { JourneyExperience } from "@/types/journey";
import { meetingYourself } from "./meeting-yourself";
import { yourStory } from "./your-story";

export const journeyExperiences: Record<string, JourneyExperience> = {
  "meeting-yourself": meetingYourself,
  "your-story": yourStory,
};