import ArrivalScene from "./scenes/ArrivalScene";
import GuideScene from "./scenes/GuideScene";
import IntentionScene from "./scenes/IntentionScene";

import ReflectionScene from "./scenes/ReflectionScene";
import JournalScene from "./scenes/JournalScene";
import QuestionScene from "./scenes/QuestionScene";
import PublicSelfScene from "./scenes/PublicSelfScene";
import PrivateSelfScene from "./scenes/PrivateSelfScene";
import LabelsScene from "./scenes/LabelsScene";
import ValuesScene from "./scenes/ValuesScene";
import StrengthsScene from "./scenes/StrengthsScene";
import InsightScene from "./scenes/InsightScene";
import CelebrationScene from "./scenes/CelebrationScene";

export const sceneRegistry = {
  arrival: ArrivalScene,
  guide: GuideScene,
  intention: IntentionScene,

  emotion: QuestionScene,
  identity: QuestionScene,

  "public-self": PublicSelfScene,
  "private-self": PrivateSelfScene,
  labels: LabelsScene,
  values: ValuesScene,
  strengths: StrengthsScene,

  reflection: ReflectionScene,
  journal: JournalScene,
  discovery: InsightScene,
  celebration: CelebrationScene,
} as const;