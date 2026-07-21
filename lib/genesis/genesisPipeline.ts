import { GenesisEngine } from "@/types/genesisEngine";
import { GenesisKnowledge } from "@/types/genesisKnowledge";

export class GenesisPipeline {
  private readonly engines: GenesisEngine[] = [];

  /**
   * Register an engine.
   */
  register(
    engine: GenesisEngine
  ) {
    this.engines.push(engine);

    this.engines.sort(
      (a, b) => a.order - b.order
    );
  }

  /**
   * Execute all engines.
   */
  run(
    knowledge: GenesisKnowledge
  ): GenesisKnowledge {
    let current = knowledge;

    for (const engine of this.engines) {
      current = engine.process(current);

      current.metadata.version++;

      current.metadata.updatedAt = new Date();
    }

    return current;
  }

  /**
   * Registered engines.
   */
  getRegisteredEngines() {
    return [...this.engines];
  }
}

export const genesisPipeline =
  new GenesisPipeline();