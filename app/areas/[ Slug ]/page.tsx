import Link from "next/link";
import { notFound } from "next/navigation";

const areas = {
  relationships: {
    icon: "❤️",
    title: "Relationships",
    subtitle: "Strengthen connection, rebuild trust, and communicate better.",
    description:
      "Relationships can bring love, safety, and belonging, but they can also become painful when communication breaks down, trust is damaged, or people feel unseen.",
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
    whyItMatters:
      "Healthy relationships shape our sense of safety, belonging, and identity. When relationships are strained, they can affect sleep, confidence, parenting, work, and emotional wellbeing.",
    exerciseTitle: "Relationship Inventory",
    exerciseSteps: [
      "Write down relationships that currently feel safe.",
      "Write down relationships that feel draining.",
      "Notice where trust, communication, or boundaries feel weak.",
      "Choose one relationship pattern you want to understand better.",
    ],
    journalPrompts: [
      "Where do I feel most unseen in my relationships?",
      "What do I need but struggle to ask for?",
      "What relationship pattern keeps repeating in my life?",
    ],
    howWeHelp: [
      "Self-discovery tools to understand your relationship patterns.",
      "Therapist support for communication, trust, marriage, and dating.",
      "Reflection prompts around boundaries, attachment, and emotional needs.",
    ],
  },

  parenting: {
    icon: "👨‍👩‍👧‍👦",
    title: "Parenting",
    subtitle: "Support for raising children while caring for yourself.",
    description:
      "Parenting can be deeply meaningful and deeply exhausting. MyDeepTalk supports parents navigating stress, guilt, co-parenting, teenagers, and family communication.",
    experiences: [
      "Parenting stress",
      "Single parenting",
      "Co-parenting",
      "Raising teenagers",
      "Child behaviour challenges",
      "Family communication",
      "Parent burnout",
      "Work-life balance",
    ],
    signs: [
      "You feel emotionally drained as a parent.",
      "You often feel guilty or not enough.",
      "Your child or teenager feels hard to reach.",
      "Family communication feels tense.",
      "You struggle to care for yourself while caring for others.",
    ],
    whyItMatters:
      "Parents carry emotional pressure silently. When parents are supported, children, relationships, and families often become healthier too.",
    exerciseTitle: "Parenting Pressure Check",
    exerciseSteps: [
      "Name the part of parenting that feels heaviest right now.",
      "Write down what support you wish you had.",
      "Notice what triggers your stress most often.",
      "Choose one small act of care for yourself this week.",
    ],
    journalPrompts: [
      "What part of parenting feels heaviest right now?",
      "What support do I need but rarely ask for?",
      "How can I care for myself while caring for my family?",
    ],
    howWeHelp: [
      "Reflection tools for parenting stress and emotional regulation.",
      "Therapists who support family dynamics, co-parenting, and parenting pressure.",
      "Gentle prompts to help you understand your parenting triggers.",
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
    whyItMatters:
      "Unhealed pain can shape how we love, parent, work, trust, and see ourselves. Healing helps restore safety, hope, and choice.",
    exerciseTitle: "Gentle Healing Reflection",
    exerciseSteps: [
      "Name one experience that still feels heavy.",
      "Write what that experience made you believe about yourself.",
      "Write what a compassionate version of you would say today.",
      "Choose one safe person, practice, or support step.",
    ],
    journalPrompts: [
      "What pain have I learned to hide?",
      "What would safety feel like for me?",
      "What part of my story still needs compassion?",
    ],
    howWeHelp: [
      "Trauma-aware reflection and self-discovery tools.",
      "Therapist matching for grief, betrayal, and emotional healing.",
      "A private space to begin processing what you have carried silently.",
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
    whyItMatters:
      "Emotional wellness affects every part of life: relationships, work, health, decision-making, and how safe you feel inside yourself.",
    exerciseTitle: "Emotion Naming Exercise",
    exerciseSteps: [
      "Pause and name what you are feeling.",
      "Notice where you feel it in your body.",
      "Ask what this emotion may be trying to tell you.",
      "Choose one healthy response instead of suppressing it.",
    ],
    journalPrompts: [
      "What emotion have I been ignoring?",
      "What is my body trying to tell me?",
      "What would feeling emotionally balanced look like?",
    ],
    howWeHelp: [
      "Private self-assessment and emotional check-ins.",
      "Therapists who support anxiety, stress, burnout, and low mood.",
      "Reflection prompts to help you name and process emotions.",
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
    whyItMatters:
      "Addiction often grows in silence and shame. Healing begins when patterns are understood with honesty, compassion, and support.",
    exerciseTitle: "Trigger Awareness Exercise",
    exerciseSteps: [
      "Identify the habit or behaviour you want to understand.",
      "Write down what usually happens before it.",
      "Name the emotion underneath the urge.",
      "Choose one support step before the next trigger.",
    ],
    journalPrompts: [
      "What am I trying to escape when I turn to this habit?",
      "What triggers my relapse patterns?",
      "What kind of support would help me stay accountable?",
    ],
    howWeHelp: [
      "Therapist support for addiction and compulsive behaviours.",
      "Reflection tools to identify triggers and patterns.",
      "A recovery-friendly space focused on progress, not shame.",
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
      "You are unsure about your purpose.",
      "You struggle with confidence or self-worth.",
      "You find it hard to set boundaries.",
      "You feel like you are living for expectations.",
    ],
    whyItMatters:
      "Self-discovery helps you live with clarity instead of confusion. When you know yourself, your relationships, choices, and purpose become more aligned.",
    exerciseTitle: "Values Check",
    exerciseSteps: [
      "Write down five values that matter to you.",
      "Circle the values you are actually living by.",
      "Notice where your life feels misaligned.",
      "Choose one small action that reflects your true values.",
    ],
    journalPrompts: [
      "Who am I becoming?",
      "What values do I want to live by?",
      "Where am I betraying myself to please others?",
    ],
    howWeHelp: [
      "Self-discovery check-ins and reflection prompts.",
      "Therapists who support identity, confidence, and life transitions.",
      "Guided tools for values, purpose, and personal growth.",
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
      "Work, money, or family pressure feels heavy.",
      "You feel unsure about identity or direction.",
    ],
    whyItMatters:
      "Men need safe emotional spaces too. Strength is not silence; it is the courage to understand what you carry and seek support when needed.",
    exerciseTitle: "Pressure Inventory",
    exerciseSteps: [
      "List the pressures you are carrying.",
      "Mark which ones you rarely talk about.",
      "Notice how they affect your relationships and body.",
      "Choose one honest conversation or support step.",
    ],
    journalPrompts: [
      "What pressure am I carrying alone?",
      "Where do I feel I must pretend to be okay?",
      "What would healthy strength look like for me?",
    ],
    howWeHelp: [
      "A private space for honest emotional reflection.",
      "Therapists who understand men's wellness and relationship pressure.",
      "Tools for stress, identity, fatherhood, and emotional expression.",
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
      "Motherhood, fertility, or work pressure feels heavy.",
      "You need rest but feel guilty taking it.",
    ],
    whyItMatters:
      "Women often give deeply while neglecting their own emotional needs. Healing includes being seen, supported, and allowed to rest.",
    exerciseTitle: "Role Reflection",
    exerciseSteps: [
      "List the roles you currently carry.",
      "Notice which role drains you most.",
      "Write what you need but rarely receive.",
      "Choose one way to care for yourself this week.",
    ],
    journalPrompts: [
      "Where do I feel stretched too thin?",
      "What part of me needs care, not performance?",
      "What support do I need in this season?",
    ],
    howWeHelp: [
      "Therapist support for motherhood, self-worth, and relationships.",
      "Self-reflection tools for emotional wellbeing.",
      "A gentle space to reconnect with yourself.",
    ],
  },

  "faith-spiritual-wellness": {
    icon: "🙏",
    title: "Faith & Spiritual Wellness",
    subtitle: "Emotional healing while honoring your values and beliefs.",
    description:
      "For many people, healing is emotional and spiritual. MyDeepTalk respects faith, values, hope, forgiveness, identity, and purpose.",
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
    whyItMatters:
      "Faith and emotional wellness are often deeply connected. Healing can include honesty, hope, forgiveness, grief, and spiritual meaning.",
    exerciseTitle: "Hope Reflection",
    exerciseSteps: [
      "Write where you feel emotionally or spiritually tired.",
      "Name what hope would look like in this season.",
      "Reflect on what you may need to release.",
      "Choose one practice that reconnects you to peace.",
    ],
    journalPrompts: [
      "Where do I need hope right now?",
      "What does healing mean to me spiritually and emotionally?",
      "What am I struggling to forgive or release?",
    ],
    howWeHelp: [
      "Reflection tools that respect your values.",
      "Therapists who understand meaning, grief, and emotional healing.",
      "Space to explore hope, forgiveness, and purpose.",
    ],
  },

  "life-challenges-transitions": {
    icon: "🌍",
    title: "Life Challenges & Transitions",
    subtitle: "Support when change feels overwhelming.",
    description:
      "Life transitions can shake your identity, confidence, relationships, and sense of direction.",
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
    whyItMatters:
      "Major transitions can affect your sense of stability. Support helps you process change with clarity instead of fear.",
    exerciseTitle: "Transition Map",
    exerciseSteps: [
      "Name the transition you are facing.",
      "Write what feels uncertain.",
      "Write what remains within your control.",
      "Choose one grounding action for this week.",
    ],
    journalPrompts: [
      "What is this season trying to teach me?",
      "What am I afraid to lose or begin?",
      "What would stability look like right now?",
    ],
    howWeHelp: [
      "Self-discovery tools for clarity and direction.",
      "Therapist support for stress, identity, and adjustment.",
      "Reflection prompts for major life decisions.",
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
          <InfoBlock title="Common Experiences" items={area.experiences} />
          <InfoBlock title="Signs You May Need Support" items={area.signs} />
          <InfoBlock title="How MyDeepTalk Helps" items={area.howWeHelp} />
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Why This Matters
          </h2>

          <p className="mt-4 leading-8 text-gray-700">{area.whyItMatters}</p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Self-Discovery Exercise
            </h2>

            <h3 className="mt-3 text-xl font-semibold text-gray-800">
              {area.exerciseTitle}
            </h3>

            <div className="mt-5 space-y-3">
              {area.exerciseSteps.map((step, index) => (
                <div key={step} className="flex gap-3 text-gray-700">
                  <span className="font-bold text-[#2C7A7B]">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Journal Prompts
            </h2>

            <div className="mt-5 space-y-4">
              {area.journalPrompts.map((prompt) => (
                <div key={prompt} className="rounded-2xl bg-[#F7F3EC] p-4">
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-12">
          <h2 className="text-3xl font-bold">You can begin gently.</h2>

          <p className="mt-4 max-w-3xl text-white/85">
            Start with a private self-discovery check-in, write in your journal,
            or connect with a therapist who can support you through this area.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/self-assessment"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C]"
            >
              Take Free Check-In
            </Link>

            <Link
              href="/journal"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white"
            >
              Write in Journal
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