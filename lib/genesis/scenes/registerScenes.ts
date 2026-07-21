// ======================================================
// Project Genesis
// Built-in Scene Registration
// ======================================================

import {
  hasScene,
  registerScene,
} from "./sceneRegistry";

const builtInScenes = [
  {
    id: "arrival",
    type: "arrival",
    component: "ArrivalScene",
  },

  {
    id: "identity",
    type: "identity",
    component: "IdentityQuestionScene",
  },

  {
    id: "reflection",
    type: "reflection",
    component: "ReflectionScene",
  },

  {
    id: "journal",
    type: "journal",
    component: "JournalScene",
  },

  {
    id: "insight",
    type: "insight",
    component: "InsightScene",
  },

  {
    id: "celebration",
    type: "celebration",
    component: "CelebrationScene",
  },
];

export function registerGenesisScenes(): void {
  for (const scene of builtInScenes) {
    if (!hasScene(scene.type)) {
      registerScene(scene);
    }
  }
}