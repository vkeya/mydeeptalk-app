import { InsightModel } from "../types";

export interface InsightContext {
  title: string;
  message: string;
  confidence: number;
  generatedAt: Date;
}

export class InsightEngine {
  build(context: InsightContext): InsightModel {
    return {
      title: context.title,
      message: context.message,
      confidence: context.confidence,
      generatedAt: context.generatedAt,
    };
  }
}

export const insightEngine = new InsightEngine();