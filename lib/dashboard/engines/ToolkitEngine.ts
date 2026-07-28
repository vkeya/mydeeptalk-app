import {
  ToolkitModel,
  ToolkitItem,
} from "../types";

export interface ToolkitContext {
  tools: ToolkitItem[];
}

export class ToolkitEngine {
  build(
    context: ToolkitContext
  ): ToolkitModel {
    return {
      tools: context.tools,
    };
  }
}

export const toolkitEngine = new ToolkitEngine();