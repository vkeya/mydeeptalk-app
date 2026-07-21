import {
  promptRegistry,
  reflectionRegistry,
  journalRegistry,
  insightRegistry,
} from "./contentRegistry";

export function getPromptSet(id: keyof typeof promptRegistry) {
  return promptRegistry[id];
}

export function getReflectionSet(
  id: keyof typeof reflectionRegistry
) {
  return reflectionRegistry[id];
}

export function getJournalSet(
  id: keyof typeof journalRegistry
) {
  return journalRegistry[id];
}

export function getInsightSet(
  id: keyof typeof insightRegistry
) {
  return insightRegistry[id];
}