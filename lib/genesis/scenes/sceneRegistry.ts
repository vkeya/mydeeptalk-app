// ======================================================
// Project Genesis
// Scene Registry
// ======================================================

import { GenesisSceneDefinition } from "@/types/genesisExperience";

export interface RegisteredScene {
  id: string;

  /**
   * Unique scene type.
   * Examples:
   * arrival
   * identity
   * reflection
   * journal
   * insight
   * celebration
   */
  type: string;

  /**
   * React component name or identifier.
   *
   * The Scene Renderer will resolve this later.
   */
  component: string;

  /**
   * Optional defaults applied to every usage.
   */
  defaults?: Partial<GenesisSceneDefinition>;
}

const registry = new Map<string, RegisteredScene>();

export function registerScene(scene: RegisteredScene): void {
  if (registry.has(scene.type)) {
    throw new Error(
      `Scene "${scene.type}" is already registered.`
    );
  }

  registry.set(scene.type, scene);
}

export function getScene(
  type: string
): RegisteredScene | undefined {
  return registry.get(type);
}

export function getRegisteredScenes(): RegisteredScene[] {
  return [...registry.values()];
}

export function hasScene(type: string): boolean {
  return registry.has(type);
}

export function clearSceneRegistry(): void {
  registry.clear();
}