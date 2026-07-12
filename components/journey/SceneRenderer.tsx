import { JourneyScene } from "@/types/journey";

import ArrivalScene from "./scenes/ArrivalScene";
import QuestionScene from "./scenes/QuestionScene";
import ReflectionScene from "./scenes/ReflectionScene";
import JournalScene from "./scenes/JournalScene";
import InsightScene from "./scenes/InsightScene";
import CelebrationScene from "./scenes/CelebrationScene";

interface Props {
  scene: JourneyScene;
}

export default function SceneRenderer({ scene }: Props) {
  switch (scene.type) {
    case "arrival":
      return <ArrivalScene scene={scene} />;

    case "question":
      return <QuestionScene scene={scene} />;

    case "reflection":
      return <ReflectionScene scene={scene} />;

    case "journal":
      return <JournalScene scene={scene} />;

    case "insight":
      return <InsightScene scene={scene} />;

    case "celebration":
      return <CelebrationScene scene={scene} />;

    default:
      return <p>Unknown scene.</p>;
  }
}