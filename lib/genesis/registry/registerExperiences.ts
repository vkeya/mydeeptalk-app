import { experienceRegistry } from "./experienceRegistry";
import { meetingYourselfExperience } from "@/data/genesis/experiences/meeting-yourself";

export function registerGenesisExperiences(): void {
  if (!experienceRegistry.has(meetingYourselfExperience.id)) {
    experienceRegistry.register(meetingYourselfExperience);
  }
}