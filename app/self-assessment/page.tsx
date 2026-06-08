"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Area =
  | "Emotional Wellness"
  | "Relationships"
  | "Healing From The Past"
  | "Self-Worth"
  | "Burnout & Stress"
  | "Purpose & Direction";

type Question = {
  text: string;
  area: Area;
  options: {
    label: string;
    score: number;
  }[];
};

const questions: Question[] = [
  {
    text: "Over the last two weeks, how often have you felt emotionally overwhelmed?",
    area: "Emotional Wellness",
    options: [
      { label: "Never", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    text: "How connected do you feel to yourself?",
    area: "Purpose & Direction",
    options: [
      { label: "Very connected", score: 0 },
      { label: "Somewhat connected", score: 1 },
      { label: "Disconnected", score: 2 },
      { label: "Completely lost", score: 3 },
    ],
  },
  {
    text: "How emotionally supported do you feel by people around you?",
    area: "Relationships",
    options: [
      { label: "Strongly supported", score: 0 },
      { label: "Moderately supported", score: 1 },
      { label: "Rarely supported", score: 2 },
      { label: "Not supported", score: 3 },
    ],
  },
  {
    text: "How much does your past still affect your present?",
    area: "Healing From The Past",
    options: [
      { label: "Not at all", score: 0 },
      { label: "A little", score: 1 },
      { label: "Quite a lot", score: 2 },
      { label: "Very deeply", score: 3 },
    ],
  },
  {
    text: "How harshly do you judge yourself?",
    area: "Self-Worth",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost constantly", score: 3 },
    ],
  },
  {
    text: "How satisfied are you with your relationships?",
    area: "Relationships",
    options: [
      { label: "Very satisfied", score: 0 },
      { label: "Somewhat satisfied", score: 1 },
      { label: "Unsatisfied", score: 2 },
      { label: "Very disconnected", score: 3 },
    ],
  },
  {
    text: "How hopeful do you feel about your future?",
    area: "Purpose & Direction",
    options: [
      { label: "Very hopeful", score: 0 },
      { label: "Somewhat hopeful", score: 1 },
      { label: "Uncertain", score: 2 },
      { label: "Not hopeful right now", score: 3 },
    ],
  },
  {
    text: "How burnt out or mentally exhausted do you feel?",
    area: "Burnout & Stress",
    options: [
      { label: "Not burnt out", score: 0 },
      { label: "A little tired", score: 1 },
      { label: "Very exhausted", score: 2 },
      { label: "Completely drained", score: 3 },
    ],
  },
  {
    text: "How easy is it for you to express your emotions honestly?",
    area: "Emotional Wellness",
    options: [
      { label: "Very easy", score: 0 },
      { label: "Somewhat easy", score: 1 },
      { label: "Difficult", score: 2 },
      { label: "Very difficult", score: 3 },
    ],
  },
  {
    text: "How meaningful does life feel right now?",
    area: "Purpose & Direction",
    options: [
      { label: "Very meaningful", score: 0 },
      { label: "Somewhat meaningful", score: 1 },
      { label: "Unclear", score: 2 },
      { label: "Empty or directionless", score: 3 },
    ],
  },
];

function getLevel(score: number) {
  if (score <= 7) {
    return {
      title: "Flourishing",
      message:
        "You appear emotionally grounded and resilient. This is a good time to continue building self-awareness and healthy habits.",
    };
  }

  if (score <= 15) {
    return {
      title: "Needs Attention",
      message:
        "You may be carrying more than you realize. Gentle reflection, rest, and emotional check-ins may help you regain balance.",
    };
  }

  if (score <= 23) {
    return {
      title: "Support Recommended",
      message:
        "Life may feel heavy right now. You do not have to carry everything alone. Guided support may be helpful.",
    };
  }

  return {
    title: "Strongly Consider Support",
    message:
      "Your responses suggest that support could be important right now. Speaking to a therapist may help you feel less alone and more supported.",
    };
}

function getRecommendations(area: Area) {
  const map: Record<Area, string[]> = {
    "Emotional Wellness": [
      "Start a daily emotion check-in.",
      "Write down what you feel before trying to fix it.",
      "Consider speaking with a therapist about emotional overwhelm.",
    ],
    Relationships: [
      "Reflect on where you feel seen and unseen.",
      "Notice patterns in trust, communication, and boundaries.",
      "Consider a therapist who supports relationship healing.",
    ],
    "Healing From The Past": [
      "Journal about what still feels unresolved.",
      "Be gentle with yourself around painful memories.",
      "Consider trauma-informed therapy support.",
    ],
    "Self-Worth": [
      "Notice your inner critic and how often it speaks.",
      "Practice writing one compassionate truth about yourself daily.",
      "Explore self-esteem and identity support.",
    ],
    "Burnout & Stress": [
      "Create space for rest without guilt.",
      "Review what is draining your energy most.",
      "Consider support around stress, pressure, and boundaries.",
    ],
    "Purpose & Direction": [
      "Reflect on what gives your life meaning.",
      "Write down what feels misaligned right now.",
      "Explore purpose, identity, and future-self exercises.",
    ],
  };

  return map[area];
}

export default function SelfAssessmentPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const completed = answers.length === questions.length;

  const totalScore = useMemo(
    () => answers.reduce((sum, score) => sum + score, 0),
    [answers]
  );

  const primaryArea = useMemo(() => {
    const areaScores: Record<Area, number> = {
      "Emotional Wellness": 0,
      Relationships: 0,
      "Healing From The Past": 0,
      "Self-Worth": 0,
      "Burnout & Stress": 0,
      "Purpose & Direction": 0,
    };

    answers.forEach((score, index) => {
      const area = questions[index].area;
      areaScores[area] += score;
    });

    return Object.entries(areaScores).sort((a, b) => b[1] - a[1])[0][0] as Area;
  }, [answers]);

  const level = getLevel(totalScore);
  const progress = Math.round((answers.length / questions.length) * 100);

  function answerQuestion(score: number) {
    const updated = [...answers];
    updated[current] = score;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  function goBack() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-6">
        <section className="mx-auto flex min-h-[80vh] max-w-4xl items-center">
          <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2C7A7B]">
              Private • Free • Takes 2 Minutes
            </p>

            <h1 className="text-4xl font-bold text-[#0F4C5C] md:text-5xl">
              Begin Your Self-Discovery Check-In
            </h1>

            <p className="mt-6 text-lg text-gray-700">
              How are you really doing? This private check-in helps you
              understand your emotional wellbeing and discover the area of your
              life that may need more care, reflection, or support.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F7F3EC] p-4">
                <h3 className="font-semibold text-[#0F4C5C]">Private</h3>
                <p className="text-sm text-gray-600">
                  Your answers stay with you in this first version.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F3EC] p-4">
                <h3 className="font-semibold text-[#0F4C5C]">Reflective</h3>
                <p className="text-sm text-gray-600">
                  Designed to help you understand, not judge yourself.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F3EC] p-4">
                <h3 className="font-semibold text-[#0F4C5C]">Actionable</h3>
                <p className="text-sm text-gray-600">
                  Get gentle next steps and therapist guidance.
                </p>
              </div>
            </div>

            <p className="mt-6 rounded-2xl bg-yellow-50 p-4 text-sm text-yellow-800">
              This is not a diagnosis. It is a self-reflection tool to help you
              understand where support may be useful.
            </p>

            <button
              onClick={() => setStarted(true)}
              className="mt-8 rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              Begin Check-In
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-6">
        <section className="mx-auto max-w-5xl py-10">
          <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2C7A7B]">
              Your Self-Discovery Result
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {level.title}
            </h1>

            <p className="mt-5 text-lg text-gray-700">{level.message}</p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F7F3EC] p-5">
                <p className="text-sm text-gray-500">Score</p>
                <h2 className="text-3xl font-bold text-[#0F4C5C]">
                  {totalScore}/30
                </h2>
              </div>

              <div className="rounded-2xl bg-[#F7F3EC] p-5 md:col-span-2">
                <p className="text-sm text-gray-500">Current Growth Area</p>
                <h2 className="text-3xl font-bold text-[#0F4C5C]">
                  {primaryArea}
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Suggested Next Steps
              </h2>

              <ul className="mt-4 space-y-3 text-gray-700">
                {getRecommendations(primaryArea).map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Reflection Prompt
              </h2>

              <p className="mt-3 text-gray-700">
                What is one thing you have been carrying silently that deserves
                care, attention, or support?
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/therapists"
                className="rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
              >
                Find a Therapist
              </Link>

              <button
                onClick={restart}
                className="rounded-full border border-[#0F4C5C] px-6 py-3 font-semibold text-[#0F4C5C]"
              >
                Retake Check-In
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const question = questions[current];

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <section className="mx-auto max-w-3xl py-10">
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>{progress}% complete</span>
          </div>

          <div className="h-3 rounded-full bg-white">
            <div
              className="h-3 rounded-full bg-[#2C7A7B]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2C7A7B]">
            {question.area}
          </p>

          <h1 className="text-3xl font-bold text-[#0F4C5C]">
            {question.text}
          </h1>

          <div className="mt-8 space-y-4">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => answerQuestion(option.score)}
                className="w-full rounded-2xl border bg-[#F7F3EC] p-5 text-left font-medium text-gray-800 hover:border-[#2C7A7B] hover:bg-white"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={goBack}
              disabled={current === 0}
              className="rounded-full border px-5 py-2 text-gray-600 disabled:opacity-40"
            >
              Back
            </button>

            <button
              onClick={restart}
              className="rounded-full px-5 py-2 text-gray-500"
            >
              Restart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}