// data/journeys/your-story.ts

import { JourneyExperience } from "@/types/journey";

export const yourStory: JourneyExperience = {
  id: "your-story",

  title: "Your Story",

  description:
    "Explore the experiences that have shaped your life and discover the story you're telling yourself.",

  xpReward: 150,

  badge: "Story Weaver",

  scenes: [
  {
    id: "arrival",
    type: "arrival",
    title: "Welcome",
    content:
      "Every life tells a story. Today you'll step back and explore yours with curiosity, honesty, and compassion.",
  },

  {
    id: "guide",
    type: "guide",
    title: "Choose Your Guide",
  },

  {
    id: "intention",
    type: "intention",
    title: "Set Your Intention",
  },

  {
    id: "book-title",
    type: "reflection",
    title: "The Book of Your Life",
    content:
      "Imagine your life as a book that is still being written.",
    prompt:
      "If your life were a book, what title would you give it today?",
    placeholder:
      "Write the title of your life story...",
  },

  {
    id: "chapters",
    type: "reflection",
    title: "The Chapters That Shaped You",
    content:
      "Every story is made up of chapters, each leaving its mark on who we become.",
    prompt:
      "What chapters or seasons of your life have shaped you the most?",
    placeholder:
      "Describe the chapters that have had the greatest influence on your life...",
  },

  {
    id: "turning-points",
    type: "reflection",
    title: "Turning Points",
    content:
      "Sometimes a single moment changes everything.",
    prompt:
      "Looking back, what moments changed the direction of your life?",
    placeholder:
      "Describe the moments that changed your path...",
  },

  {
    id: "current-chapter",
    type: "reflection",
    title: "Your Current Chapter",
    content:
      "Your story is still unfolding.",
    prompt:
      "What chapter are you living through today, and what do you hope the next chapter becomes?",
    placeholder:
      "Describe where you are today and where you're heading...",
  },

  {
    id: "journal",
    type: "journal",
    title: "Capture Your Story",
    prompt:
      "Write a short summary of your life story so far. Focus on the experiences that have shaped who you are.",
    placeholder:
      "Begin writing your story...",
  },

  {
    id: "discovery",
    type: "discovery",
    title: "What Your Story Reveals",
    insight:
      "Every life story contains patterns of resilience, learning, and growth. Understanding your story is the first step toward intentionally writing the chapters still to come.",
  },

  {
    id: "celebration",
    type: "celebration",
    title: "Story Complete",
    celebrationMessage:
      "You've taken an important step in understanding your life's narrative. Your story matters, and the next chapter is yours to write.",
    xpReward: 150,
  },
]
};