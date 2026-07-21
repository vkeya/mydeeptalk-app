import { JourneyState } from "@/context/JourneyContext";
import { JourneyResponse } from "@/types/genesisJourneyResponse";

export function buildMeetingYourselfResponse(
  state: JourneyState
): JourneyResponse {
  return {
    experienceId: state.experienceId,

    responses: [
      {
        sceneId: "guide",
        response: state.selectedGuide,
      },
      {
        sceneId: "intention",
        response: state.journeyIntention,
      },
      {
        sceneId: "emotion",
        response: state.selectedEmotion,
      },
      {
        sceneId: "desired-emotion",
        response: state.desiredEmotion,
      },
      {
        sceneId: "identity",
        response: state.identityAnswer,
      },
      {
        sceneId: "public-self",
        response: state.publicSelf.join(", "),
      },
      {
        sceneId: "private-self",
        response: state.privateSelf.join(", "),
      },
      {
        sceneId: "labels",
        response: state.identityLabels.join(", "),
      },
      {
        sceneId: "values",
        response: state.coreValues.join(", "),
      },
      {
        sceneId: "strengths",
        response: state.strengths.join(", "),
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