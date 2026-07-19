import { GenesisExperience } from "@/types/genesisExperience";

class ExperienceRegistry {
  private experiences = new Map<string, GenesisExperience>();

  register(experience: GenesisExperience): void {
    this.experiences.set(experience.id, experience);
  }

  get(id: string): GenesisExperience | undefined {
    return this.experiences.get(id);
  }

  getAll(): GenesisExperience[] {
    return Array.from(this.experiences.values());
  }

  has(id: string): boolean {
    return this.experiences.has(id);
  }

  clear(): void {
    this.experiences.clear();
  }
}

export const experienceRegistry = new ExperienceRegistry();