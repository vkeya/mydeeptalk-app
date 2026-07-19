import { JourneyState } from "@/context/JourneyContext";
import { JourneyResponse } from "@/types/genesisJourneyResponse";

export function buildMeetingYourselfResponse(
  state: JourneyState
): JourneyResponse {
  return {
    experienceId: state.experienceId,

    responses: [
      {
        sceneId: "identity",
        response: state.identityAnswer,
      },
      {
        sceneId: "journal",
        response: state.journalEntry,
      },
    ].filter(
      (item) => item.response.trim().length > 0
    ),
  };
}