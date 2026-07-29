export interface UserProfilePreferences {
  dailyReflection: boolean;
  weeklyInsights: boolean;
  sessionReminders: boolean;
  productUpdates: boolean;
}

export interface UserProfile {
  privacyName: string;

  avatarUrl?: string;

  country: string;

  timezone: string;

  preferredLanguage: string;

  preferences: UserProfilePreferences;

  completionPercentage: number;

  completed: boolean;

  completedAt?: Date;
}

export const defaultProfilePreferences: UserProfilePreferences = {
  dailyReflection: true,
  weeklyInsights: true,
  sessionReminders: true,
  productUpdates: false,
};

export const emptyUserProfile: UserProfile = {
  privacyName: "",

  avatarUrl: "",

  country: "",

  timezone: "",

  preferredLanguage: "",

  preferences: defaultProfilePreferences,

  completionPercentage: 0,

  completed: false,
};