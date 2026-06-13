# MyDeepTalk Database Documentation

MyDeepTalk uses Firestore as the main database.

## users

Stores all users: clients, therapists, and admins.

```ts
users/{uid} {
  uid: string
  fullName: string
  alias?: string
  email: string
  role: "client" | "therapist" | "admin"
  provider?: "email" | "google"
  emailVerified?: boolean
  ageConfirmed18?: boolean
  termsAccepted?: boolean
  privacyAccepted?: boolean
  termsAcceptedAt?: timestamp
  privacyAcceptedAt?: timestamp
  createdAt: timestamp
  updatedAt?: timestamp
}

therapists/{uid} {
  fullName: string
  gender?: string
  bio?: string
  specialties?: string[]
  languages?: string[]
  yearsExperience?: number
  sessionFee?: number
  sessionFees?: {
    individual?: number
    couple?: number
    parentChild?: number
    family?: number
  }
  feeCurrency?: "KES" | "USD"
  country?: string
  city?: string
  profilePhoto?: string
  photoPositionX?: number
  photoPositionY?: number
  status: "pending" | "approved" | "rejected"
  profileComplete?: boolean
  createdAt?: timestamp
  updatedAt?: timestamp
}

therapistCredentials/{uid} {
  therapistId: string
  licenseNumber?: string
  licenseFileUrl?: string
  education?: array
  documents?: array
  status?: "pending" | "approved" | "rejected"
  createdAt?: timestamp
  updatedAt?: timestamp
}

therapistAvailability/{therapistId} {
  therapistId: string
  sessionDuration: number
  weeklySlots: [
    {
      day: string
      enabled: boolean
      startTime: string
      endTime: string
    }
  ]
  updatedAt?: timestamp
}

preBookingIntakes/{clientId} {
  uid: string
  email: string
  therapyExperience: string
  previousTherapyExperience?: string
  mainConcerns: string[]
  goals: string[]
  relationshipStatus?: string
  sessionType: string
  emotionalScores: {
    anxiety: number
    sadness: number
    stress: number
    loneliness: number
    anger: number
  }
  therapistPreferences: {
    gender?: string
    age?: string
    style?: string
    faithBasedCounseling?: string
    language?: string
    sessionMode?: string
  }
  currencyPreference: "KES" | "USD"
  budgetRange: string
  urgency?: string
  preferredTime?: string
  comfortLevel?: string
  supportExpectation?: string
  notes?: string
  status: "completed"
  createdAt: timestamp
  updatedAt: timestamp
}

bookings/{bookingId} {
  clientId: string
  clientName?: string
  clientAlias?: string
  clientEmail?: string

  therapistId: string
  therapistName?: string
  therapistEmail?: string

  sessionFee: number
  sessionDate: string
  sessionTime: string
  sessionDuration: number

  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "unpaid" | "paid" | "gifted"
  paymentMethod?: "normal_payment" | "gift_credit"

  giftCreditUsed?: boolean
  giftCreditId?: string

  meetingLink?: string
  paidAt?: timestamp
  createdAt: timestamp
  updatedAt?: timestamp
}

reviews/{reviewId} {
  bookingId: string
  clientId: string
  clientAlias?: string
  therapistId: string
  therapistName?: string
  rating: number
  comment?: string
  createdAt: timestamp
}

journalEntries/{entryId} {
  userId: string
  mood?: string
  prompt?: string
  content: string
  createdAt: timestamp
}

therapyCredits/{clientId} {
  clientId: string
  remainingSessions: number
  giftedBy?: string
  giftType?: "general" | "specific_therapist"
  therapistId?: string
  createdAt?: timestamp
  updatedAt?: timestamp
}

healingCircles/{circleId} {
  createdBy: string
  beneficiaryName?: string
  purpose?: string
  targetSessions?: number
  contributedSessions?: number
  status?: "active" | "completed" | "cancelled"
  createdAt?: timestamp
}

dashboardAnnouncements/{announcementId} {
  active: boolean
  audience?: "all" | "client" | "therapist" | "admin"
  title: string
  headline: string
  description: string
  closingText?: string
  ctaText: string
  ctaLink: string
  order?: number
  startDate?: string
  endDate?: string
}

