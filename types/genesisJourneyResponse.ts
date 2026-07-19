export interface JourneySceneResponse {
  sceneId: string;
  response: string;
}

export interface JourneyResponse {
  experienceId: string;
  responses: JourneySceneResponse[];
}