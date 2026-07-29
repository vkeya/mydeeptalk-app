

export interface DashboardState {
  isFirstVisit: boolean;

  hero: {
    title: string;
    subtitle: string;
    primaryAction: {
      label: string;
      href: string;
    };
  };

  insight: {
    available: boolean;
    title: string;
    message: string;
  };

  progress: {
    wellbeingScore: number | null;
    streak: number;
    journalEntries: number;
    genesisProgress: number;
  };

  journey: {
    started: boolean;
    completed: boolean;
    nextActionLabel: string;
    nextActionHref: string;
  };

  // NEW
  
}

export function buildDashboardState(): DashboardState {
  // NEW
  



  return {
    isFirstVisit: true,

    hero: {
      title: "How are you feeling today?",
      subtitle:
        "Take a moment to check in with yourself. Every small reflection is a step toward deeper self-awareness.",
      primaryAction: {
        label: "Complete Today's Check-In",
        href: "/check-in",
      },
    },

    insight: {
      available: false,
      title: "Welcome to MyDeepTalk",
      message:
        "Complete your first emotional check-in to begin receiving personalized insights.",
    },

   progress: {
    wellbeingScore: null,
    streak: 0,
    journalEntries: 0,
    genesisProgress: 0,
},

    journey: {
      started: false,
      completed: false,
      nextActionLabel: "Begin Genesis",
      nextActionHref: "/genesis",
    },

 
  };
}