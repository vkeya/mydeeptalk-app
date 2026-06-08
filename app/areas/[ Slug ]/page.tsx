import Link from "next/link";
import { notFound } from "next/navigation";

const areas = {
  relationships: {
    icon: "❤️",
    title: "Relationships",
    subtitle: "Strengthen connection, rebuild trust, and communicate better.",
    description:
      "Relationships can bring love, safety, and belonging, but they can also become painful when communication breaks down, trust is damaged, or people feel unseen. MyDeepTalk helps you reflect, understand your patterns, and connect with support when relationships feel heavy.",
    signs: [
      "Frequent conflict or emotional distance",
      "Difficulty communicating honestly",
      "Trust issues or betrayal wounds",
      "Feeling lonely even around people",
      "Struggling with dating, marriage, or separation",
    ],
    howWeHelp: [
      "Self-discovery tools to understand your relationship patterns",
      "Therapists who support couples, dating, trust, and communication",
      "Reflection prompts around boundaries, attachment, and emotional needs",
    ],
    prompts: [
      "Where do I feel most unseen in my relationships?",
      "What do I need but struggle to ask for?",
      "What relationship pattern keeps repeating in my life?",
    ],
  },

  parenting: {
    icon: "👨‍👩‍👧‍👦",
    title: "Parenting",
    subtitle: "Support for raising children while caring for yourself.",
    description:
      "Parenting can be deeply meaningful and deeply exhausting. MyDeepTalk supports parents navigating stress, guilt, co-parenting, teenagers, family communication, and the emotional pressure of caring for others while also needing care yourself.",
    signs: [
      "Feeling overwhelmed or burnt out as a parent",
      "Struggling with co-parenting or family communication",
      "Difficulty connecting with your child or teenager",
      "Feeling guilty, impatient, or emotionally drained",
      "Balancing work, family, and personal wellbeing",
    ],
    howWeHelp: [
      "Reflection tools for parenting stress and emotional regulation",
      "Therapists who support parenting, family dynamics, and co-parenting",
      "Gentle prompts to help you understand your parenting triggers",
    ],
    prompts: [
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
    signs: [
      "Painful memories still affecting your present",
      "Difficulty trusting people",
      "Carrying shame, guilt, or fear",
      "Feeling emotionally guarded or unsafe",
      "Grief, betrayal, or loss that still feels heavy",
    ],
    howWeHelp: [
      "Trauma-aware reflection and self-discovery tools",
      "Therapist matching for grief, betrayal, and emotional healing",
      "A private space to begin processing what you have carried silently",
    ],
    prompts: [
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
      "Emotional wellness is about understanding what you feel, why you feel it, and how to respond in healthier ways. MyDeepTalk helps you notice stress, burnout, anxiety, sadness, anger, and overwhelm before they consume your life.",
    signs: [
      "Feeling anxious, stressed, or emotionally overwhelmed",
      "Low mood or loss of motivation",
      "Difficulty sleeping or relaxing",
      "Anger, irritability, or emotional shutdown",
      "Feeling like you are coping but not really okay",
    ],
    howWeHelp: [
      "Private self-assessment and emotional check-ins",
      "Therapists who support anxiety, stress, burnout, and low mood",
      "Reflection prompts to help you name and process emotions",
    ],
    prompts: [
      "What emotion have I been ignoring?",
      "What is my body trying to tell me?",
      "What would feeling emotionally balanced look like?",
    ],
  },

  "addiction-recovery": {
    icon: "🔄",
    title: "Addiction & Recovery",
    subtitle: "Support and accountability for rebuilding life.",
    description:
      "Recovery is not only about stopping a behaviour; it is about understanding the pain, habits, triggers, and unmet needs underneath it. MyDeepTalk offers a supportive path toward awareness, accountability, and healing.",
    signs: [
      "Repeating habits you feel unable to control",
      "Using substances or behaviours to cope with pain",
      "Feeling shame after certain choices",
      "Struggling with relapse or secrecy",
      "Needing accountability and non-judgmental support",
    ],
    howWeHelp: [
      "Therapist support for addiction and compulsive behaviours",
      "Reflection tools to identify triggers and patterns",
      "A recovery-friendly space focused on progress, not shame",
    ],
    prompts: [
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
      "Many people feel lost not because they lack ability, but because they have never had space to understand themselves. MyDeepTalk helps you explore identity, values, purpose, boundaries, confidence, and the future version of yourself.",
    signs: [
      "Feeling lost or disconnected from yourself",
      "Uncertainty about purpose or direction",
      "Low confidence or self-worth",
      "Difficulty setting boundaries",
      "Living to meet expectations instead of your values",
    ],
    howWeHelp: [
      "Self-discovery check-ins and reflection prompts",
      "Therapists who support identity, confidence, and life transitions",
      "Guided tools for values, purpose, and personal growth",
    ],
    prompts: [
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
      "Many men carry pressure silently: career expectations, fatherhood, identity, relationships, loneliness, and emotional pain. MyDeepTalk creates space for honest reflection without shame.",
    signs: [
      "Feeling pressure to always be strong",
      "Difficulty expressing emotions",
      "Stress around work, money, or fatherhood",
      "Feeling lonely but not saying it",
      "Relationship struggles or identity questions",
    ],
    howWeHelp: [
      "A private space for honest emotional reflection",
      "Therapists who understand men's wellness and relationship pressure",
      "Tools for stress, identity, fatherhood, and emotional expression",
    ],
    prompts: [
      "What pressure am I carrying alone?",
      "Where do I feel I must pretend to be okay?",
      "What would healthy strength look like for me?",
    ],
  },

  "womens-wellness": {
    icon: "👩",
    title: "Women's Wellness",
    subtitle: "Support for women navigating life's many roles.",
    description:
      "Women often carry many roles at once: partner, mother, professional, caregiver, leader, and friend. MyDeepTalk supports women through stress, self-worth, motherhood, transitions, relationships, and emotional wellbeing.",
    signs: [
      "Feeling emotionally exhausted from many roles",
      "Struggling with self-worth or body image",
      "Stress around motherhood, work, or relationships",
      "Postpartum or fertility-related emotional strain",
      "Feeling unseen while caring for others",
    ],
    howWeHelp: [
      "Therapist support for motherhood, self-worth, and relationships",
      "Self-reflection tools for emotional wellbeing",
      "A gentle space to reconnect with yourself",
    ],
    prompts: [
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
    signs: [
      "Struggling with hope, meaning, or forgiveness",
      "Feeling spiritually dry or emotionally heavy",
      "Grief, suffering, or unanswered questions",
      "Trying to align healing with personal values",
      "Searching for purpose and peace",
    ],
    howWeHelp: [
      "Reflection tools that respect your values",
      "Therapists who understand meaning, grief, and emotional healing",
      "Space to explore hope, forgiveness, and purpose",
    ],
    prompts: [
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
    signs: [
      "Career changes or job uncertainty",
      "Relocation or starting over",
      "Financial stress",
      "Academic pressure",
      "Retirement, relationship changes, or major decisions",
    ],
    howWeHelp: [
      "Self-discovery tools for clarity and direction",
      "Therapist support for stress, identity, and adjustment",
      "Reflection prompts for major life decisions",
    ],
    prompts: [
      "What is this season trying to teach me?",
      "What am I afraid to lose or begin?",
      "What would stability look like right now?",
    ],
  },
};

type AreaSlug = keyof typeof areas;

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = areas[params.slug as AreaSlug];

  if (!area) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block font-semibold text-[#0F4C5C] hover:underline"
        >
          ← Back Home
        </Link>

        <section className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <div className="text-5xl">{area.icon}</div>

          <h1 className="mt-5 text-4xl font-bold text-[#0F4C5C] md:text-5xl">
            {area.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-gray-700">
            {area.subtitle}
          </p>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-700">
            {area.description}
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoBlock title="Common Signs" items={area.signs} />
          <InfoBlock title="How MyDeepTalk Helps" items={area.howWeHelp} />
          <InfoBlock title="Reflection Questions" items={area.prompts} />
        </section>

        <section className="mt-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-12">
          <h2 className="text-3xl font-bold">You can begin gently.</h2>

          <p className="mt-4 max-w-3xl text-white/85">
            Start with a private self-discovery check-in or connect with a
            therapist who can support you through this area.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/self-assessment"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C]"
            >
              Take Free Check-In
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white"
            >
              Find a Therapist
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-[#0F4C5C]">{title}</h2>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-gray-700">
            <span className="font-bold text-[#2C7A7B]">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}