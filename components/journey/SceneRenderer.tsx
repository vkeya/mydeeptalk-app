import type { JourneyScene } from "@/types/journey";

import ArrivalScene from "./scenes/ArrivalScene";
import QuestionScene from "./scenes/QuestionScene";
import ReflectionScene from "./scenes/ReflectionScene";
import JournalScene from "./scenes/JournalScene";
import InsightScene from "./scenes/InsightScene";
import CelebrationScene from "./scenes/CelebrationScene";
import IntentionScene from "./scenes/IntentionScene";
import GuideScene from "./scenes/GuideScene";
import PublicSelfScene from "./scenes/PublicSelfScene";
import PrivateSelfScene from "./scenes/PrivateSelfScene";
import LabelsScene from "./scenes/LabelsScene";
import ValuesScene from "./scenes/ValuesScene";
import StrengthsScene from "./scenes/StrengthsScene";
import EmotionScene from "./scenes/EmotionScene";
import { useJourney } from "@/context/JourneyContext";

interface Props {
  scene: JourneyScene;
}

export default function SceneRenderer({ scene }: Props) {
	 const { state } = useJourney();
	 
  const renderers = {
    arrival: () => <ArrivalScene scene={scene} />,
    guide: () => <GuideScene />,
    intention: () => <IntentionScene />,
    identity: () => <QuestionScene scene={scene} />,
    emotion: () => <EmotionScene />,
    "public-self": () => <PublicSelfScene />,
    "private-self": () => <PrivateSelfScene />,
    labels: () => <LabelsScene />,
    values: () => <ValuesScene />,
    strengths: () => <StrengthsScene />,
    reflection: () => (
  <ReflectionScene
    scene={scene}
    reflection={state.reflection}
  />
),
    journal: () => <JournalScene scene={scene} />,
    discovery: () => <InsightScene />,
    celebration: () => <CelebrationScene />,
 } satisfies Record<JourneyScene["type"], () => React.ReactNode>;

  const render = renderers[scene.type];

  return render ? render() : <p>Unknown scene.</p>;
}

