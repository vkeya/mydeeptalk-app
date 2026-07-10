
import Link from "next/link";
import { notFound } from "next/navigation";

const areas = {
  relationships: {
    icon: "❤️",
    title: "Relationships",
    subtitle:
      "Strengthen connection, rebuild trust, and communicate better.",
    description:
      "Relationships can bring love and belonging, but they can also become painful when communication breaks down or trust is damaged.",

    experiences: [
      "Marriage difficulties",
      "Communication problems",
      "Trust and betrayal",
      "Emotional distance",
      "Dating challenges",
      "Attachment wounds",
      "Loneliness",
      "Divorce recovery",
    ],

    signs: [
      "You feel unseen or unheard.",
      "Arguments keep repeating.",
      "Trust has been broken.",
      "You withdraw instead of expressing yourself.",
      "You feel lonely even around people.",
    ],

    journalPrompts: [
      "Where do I feel most unseen in my relationships?",
      "What do I need but struggle to ask for?",
      "What relationship pattern keeps repeating in my life?",
    ],
  },

  parenting: {
    icon: "👨‍👩‍👧‍👦",
    title: "Parenting",
    subtitle:
      "Support for raising children while caring for yourself.",
    description:
      "Parenting can be deeply meaningful and deeply exhausting.",

    experiences: [
      "Parenting stress",
      "Single parenting",
      "Co-parenting",
      "Raising teenagers",
      "Family communication",
      "Parent burnout",
    ],

    signs: [
      "You feel emotionally drained.",
      "You feel guilty or not enough.",
      "You struggle to care for yourself.",
    ],

    journalPrompts: [
      "What part of parenting feels heaviest right now?",
      "What support do I need but rarely ask for?",
      "How can I care for myself while caring for my family?",
    ],
  },
  
  "trauma-healing": {
  icon: "🌿",
  title: "Trauma & Healing",
  subtitle: "Gentle support for painful experiences and emotional wounds.",
  description:
    "Some experiences stay with us long after they happen. MyDeepTalk offers a gentle place to begin understanding grief, betrayal, shame, loss, and painful memories without judgment.",
  experiences: [
    "Childhood wounds",
    "Grief and loss",
    "Betrayal trauma",
    "Emotional abuse",
    "Shame and guilt",
    "PTSD",
    "Forgiveness",
    "Life after loss",
  ],
  signs: [
    "Painful memories still affect your present.",
    "You struggle to trust people.",
    "You feel emotionally guarded or unsafe.",
    "You carry shame, guilt, or fear.",
    "You avoid certain conversations, people, or places.",
  ],
  journalPrompts: [
    "What pain have I learned to hide?",
    "What would safety feel like for me?",
    "What part of my story still needs compassion?",
  ],
},

"mental-emotional-wellness": {
  icon: "🧠",
  title: "Mental & Emotional Wellness",
  subtitle: "Build resilience and healthier ways of coping.",
  description:
    "Emotional wellness is about understanding what you feel, why you feel it, and how to respond in healthier ways.",

  experiences: [
    "Anxiety",
    "Depression",
    "Stress",
    "Burnout",
    "Panic attacks",
    "Anger management",
    "Sleep difficulties",
    "Low self-esteem",
  ],

  signs: [
    "You feel emotionally overwhelmed.",
    "You struggle to sleep or relax.",
    "You feel anxious, low, or constantly tired.",
    "You get irritated or shut down easily.",
    "You feel like you are coping but not really okay.",
  ],

  journalPrompts: [
    "What emotion have I been ignoring?",
    "What is my body trying to tell me?",
    "What would emotional balance look like for me?",
  ],
},

"addiction-recovery": {
  icon: "🔄",
  title: "Addiction & Recovery",
  subtitle: "Support and accountability for rebuilding life.",
  description:
    "Recovery is not only about stopping a behaviour; it is about understanding the pain, habits, triggers, and unmet needs underneath it.",

  experiences: [
    "Pornography addiction",
    "Alcohol addiction",
    "Drug abuse",
    "Gambling addiction",
    "Compulsive behaviours",
    "Relapse prevention",
    "Accountability",
    "Recovery support",
  ],

  signs: [
    "You repeat habits you feel unable to control.",
    "You use behaviours or substances to escape pain.",
    "You feel shame after certain choices.",
    "You struggle with secrecy or relapse.",
    "You want accountability but fear judgment.",
  ],

  journalPrompts: [
    "What am I trying to escape when I turn to this habit?",
    "What triggers my relapse patterns?",
    "What kind of support would help me stay accountable?",
  ],
},

"self-discovery-purpose": {
  icon: "✨",
  title: "Self-Discovery & Purpose",
  subtitle: "Understand yourself and build a life aligned with who you are.",
  description:
    "Many people feel lost not because they lack ability, but because they have never had space to understand themselves.",

  experiences: [
    "Identity",
    "Confidence",
    "Self-worth",
    "Life transitions",
    "Career uncertainty",
    "Purpose",
    "Boundaries",
    "Personal growth",
  ],

  signs: [
    "You feel lost or disconnected from yourself.",
    "You are unsure about purpose or direction.",
    "You struggle with confidence or self-worth.",
    "You find it hard to set boundaries.",
    "You feel like you are living for expectations.",
  ],

  journalPrompts: [
    "Who am I becoming?",
    "What values do I want to live by?",
    "Where am I betraying myself to please others?",
  ],
},

"mens-wellness": {
  icon: "👨",
  title: "Men's Wellness",
  subtitle: "A safe place for men to talk openly.",
  description:
    "Many men carry pressure silently: career expectations, fatherhood, identity, relationships, loneliness, and emotional pain.",

  experiences: [
    "Fatherhood",
    "Masculinity",
    "Career pressure",
    "Burnout",
    "Relationships",
    "Loneliness",
    "Identity",
    "Midlife transitions",
  ],

  signs: [
    "You feel pressure to always be strong.",
    "You struggle to express emotions.",
    "You feel lonely but rarely say it.",
    "Work or family pressure feels heavy.",
    "You feel unsure about identity or direction.",
  ],

  journalPrompts: [
    "What pressure am I carrying alone?",
    "Where do I pretend to be okay?",
    "What would healthy strength look like for me?",
  ],
},

"womens-wellness": {
  icon: "👩",
  title: "Women's Wellness",
  subtitle: "Support for women navigating life's many roles.",
  description:
    "Women often carry many roles at once: partner, mother, professional, caregiver, leader, and friend.",

  experiences: [
    "Motherhood",
    "Pregnancy",
    "Postpartum wellbeing",
    "Fertility struggles",
    "Self-esteem",
    "Relationships",
    "Stress",
    "Work-life balance",
  ],

  signs: [
    "You feel emotionally exhausted from many roles.",
    "You struggle with self-worth or confidence.",
    "You feel unseen while caring for others.",
    "Motherhood or work pressure feels heavy.",
    "You need rest but feel guilty taking it.",
  ],

  journalPrompts: [
    "Where do I feel stretched too thin?",
    "What part of me needs care, not performance?",
    "What support do I need in this season?",
  ],
},

"faith-spiritual-wellness": {
  icon: "🙏",
  title: "Faith & Spiritual Wellness",
  subtitle: "Emotional healing while honoring your values and beliefs.",
  description:
    "For many people, healing is emotional and spiritual. MyDeepTalk respects faith, values, hope, forgiveness, identity, and purpose while helping users process real emotional struggles.",

  experiences: [
    "Faith and mental health",
    "Hope",
    "Meaning",
    "Forgiveness",
    "Spiritual struggles",
    "Identity",
    "Life transitions",
  ],

  signs: [
    "You struggle with hope, meaning, or forgiveness.",
    "You feel spiritually dry or emotionally heavy.",
    "You are grieving or questioning suffering.",
    "You want healing that respects your values.",
    "You are searching for purpose and peace.",
  ],

  journalPrompts: [
    "Where do I need hope right now?",
    "What does healing mean to me spiritually and emotionally?",
    "What am I struggling to forgive or release?",
  ],
},

"life-challenges-transitions": {
  icon: "🌍",
  title: "Life Challenges & Transitions",
  subtitle: "Support when change feels overwhelming.",
  description:
    "Life transitions can shake your identity, confidence, relationships, and sense of direction. MyDeepTalk helps you process change and find stability during uncertain seasons.",

  experiences: [
    "Career changes",
    "Financial stress",
    "Relocation",
    "Academic pressure",
    "Retirement",
    "Relationship transitions",
    "Major life decisions",
  ],

  signs: [
    "You feel uncertain about the next chapter.",
    "Change has affected your confidence or identity.",
    "You feel stressed by money, work, or relocation.",
    "You are carrying pressure around a major decision.",
    "You feel like you are starting over.",
  ],

  journalPrompts: [
    "What is this season trying to teach me?",
    "What am I afraid to lose or begin?",
    "What would stability look like right now?",
  ],
},
};

type AreaSlug = keyof typeof areas;

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const area = areas[slug as AreaSlug];

  if (!area) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-block font-semibold text-[#0F4C5C]"
        >
          ← Back Home
        </Link>

        <section className="rounded-3xl bg-white p-10 shadow-lg">
          <div className="text-5xl">{area.icon}</div>

          <h1 className="mt-5 text-5xl font-bold text-[#0F4C5C]">
            {area.title}
          </h1>

          <p className="mt-4 text-2xl text-gray-700">
            {area.subtitle}
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            {area.description}
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Common Experiences
            </h2>

            <div className="mt-5 space-y-3">
              {area.experiences.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Signs You May Need Support
            </h2>

            <div className="mt-5 space-y-3">
              {area.signs.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

        </div>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Journal Prompts
          </h2>

          <div className="mt-5 space-y-4">
            {area.journalPrompts.map((prompt) => (
              <div
                key={prompt}
                className="rounded-2xl bg-[#F7F3EC] p-4"
              >
                {prompt}
              </div>
            ))}
          </div>
        </section>
		
		<section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
              What Healing Can Look Like
          </h2>

          <div className="mt-5 space-y-4 leading-8 text-gray-700">
          <p>
               Healing does not mean becoming perfect. It means becoming more aware,
               more honest, and more compassionate with yourself.
          </p>

          <p>
               Healing may look like healthier boundaries, better communication,
               emotional regulation, deeper relationships, or simply feeling lighter
               and more at peace.
          </p>

          <p>
               Growth is often gradual. Small steps matter.
          </p>
          </div>
        </section>
		
		<section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
              When Therapy May Help
          </h2>

          <div className="mt-5 space-y-3 text-gray-700">
          <div>✓ You feel overwhelmed and do not know where to begin.</div>

          <div>✓ Old patterns keep repeating despite your efforts.</div>

          <div>✓ Stress, anxiety, or emotional pain are affecting daily life.</div>

          <div>✓ You want a safe place to process your experiences.</div>

          <div>✓ You want support without judgment.</div>
         </div>
        </section>
		
		<section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
              How MyDeepTalk Supports You
          </h2>

          <div className="mt-5 space-y-4 leading-8 text-gray-700">
          <p>
               MyDeepTalk helps you begin with self-awareness before life becomes too
               heavy.
          </p>

          <p>
               Through self-discovery, guided journaling, and access to verified
               therapists, we provide a gentle path toward healing and growth.
          </p>

          <p>
               You do not have to figure everything out alone.
          </p>
         </div>
        </section>

        <section className="mt-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white">
          <h2 className="text-3xl font-bold">
            You can begin gently.
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/assessments"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C]"
            >
              Take Free Check-In
            </Link>

            <Link
              href="/journal"
              className="rounded-full border border-white px-6 py-3"
            >
              Write in Journal
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-white px-6 py-3"
            >
              Find a Therapist
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

