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
      encouragement: this.getEncouragement(),
    };
  }

  private getEncouragement(): string {
    const messages = [
      "Every small step you take today matters.",
      "Healing happens one moment at a time.",
      "Thank you for showing up for yourself today.",
      "Growth isn't about perfection. It's about consistency.",
      "You are continuing a journey that matters.",
    ];

    return messages[
      Math.floor(Math.random() * messages.length)
    ];
  }
}

export const welcomeEngine = new WelcomeEngine();