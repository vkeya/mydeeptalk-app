
import { JourneyState } from "@/context/JourneyContext";
import { JourneyResponse } from "@/types/genesisJourneyResponse";

export function buildYourStoryResponse(
  state: JourneyState
): JourneyResponse {
  return {
    experienceId: "your-story",

    responses: [],
  };
}