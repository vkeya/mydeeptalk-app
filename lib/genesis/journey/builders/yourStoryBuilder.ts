import { JourneyState } from "@/context/JourneyContext";
import { JourneyResponse } from "@/types/genesisJourneyResponse";

export function buildYourStoryResponse(
  state: JourneyState
): JourneyResponse {
  return {
    experienceId: state.experienceId,

    responses: [
      {
        sceneId: "childhood",
        response: state.childhoodReflection,
      },
    ].filter(
      (item) => item.response.trim().length > 0
    ),
  };
}