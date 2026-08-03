import { WelcomeSection } from "../types";

export class WelcomeEngine {
  build(userName: string): WelcomeSection {
    const hour = new Date().getHours();

    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";

    return {
      greeting,
      userName,

      title: "Your healing journey begins today.",

      message:
        "Take one minute to complete today's emotional check-in. Every small step matters.",

      actionLabel: "Begin Today's Check-In",

      actionHref: "/check-in",
    };
  }
}

export const welcomeEngine = new WelcomeEngine();