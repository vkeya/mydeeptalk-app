import {
  registerExperience,
  hasExperience,
} from "./experienceRegistry";

import { meetingYourselfExperience } from "@/data/genesis/experiences/meeting-yourself";

export function registerGenesisExperiences(): void {
  if (!hasExperience(meetingYourselfExperience.id)) {
    registerExperience(meetingYourselfExperience);
  }
}