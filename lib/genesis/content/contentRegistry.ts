// lib/genesis/content/contentRegistry.ts

import { identityPrompts } from "@/data/genesis/prompts/identity";
import { identityReflections } from "@/data/genesis/reflections/identity";
import { identityJournal } from "@/data/genesis/journals/identity";
import { identityInsights } from "@/data/genesis/insights/identity";

export const promptRegistry = {
  "prompt.identity": identityPrompts,
} as const;

export const reflectionRegistry = {
  "reflection.identity": identityReflections,
} as const;

export const journalRegistry = {
  "journal.identity": identityJournal,
} as const;

export const insightRegistry = {
  "insight.identity": identityInsights,
} as const;