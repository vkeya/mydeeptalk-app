Chapter 1 — Purpose

Why does MyDeepTalk exist?

For example:

MyDeepTalk exists to help people understand themselves, strengthen their wellbeing, and navigate healing through evidence-based, explainable, and personalized guidance while respecting human dignity, privacy, and professional care.

Every feature should be able to justify itself against this purpose.

Chapter 2 — Core Principles

These become the rules that every future feature follows.

1. Person Before Profile

The platform never reduces someone to a score.

Scores support understanding—they never define identity.

2. Explainable Intelligence

Every recommendation should answer:

Why?
Based on what evidence?
What should I do next?

No black-box guidance.

3. Growth Over Perfection

The platform celebrates progress.

Not just outcomes.

A person improving from 30 → 45 deserves recognition.

4. Human-Centered Care

AI supports.

Professionals treat.

Community encourages.

The platform should never blur those roles.

5. Evidence Over Assumption

Every profile change should be traceable to evidence.

Examples:

Assessments
Journal reflections
Genesis progress
Therapy participation
Mood check-ins
6. Adaptive Experiences

Two people with identical assessment scores may receive different experiences because of:

Healing stage
Evidence history
Goals
Preferences
Chapter 3 — The Seven Domains

Document the domains we've identified:

Identity

↓

Evidence

↓

Intelligence

↓

Healing

↓

Experience

↓

Professional Care

↓

Community

Each domain should define:

Purpose
Responsibilities
What belongs there
What does not belong there

This prevents architecture drift as the project grows.

Chapter 4 — Platform Workflow

Define the lifecycle clearly.

User Interaction

↓

Evidence

↓

Evidence Pipeline

↓

Wellbeing Profile

↓

Insights

↓

Healing Stage

↓

Healing Path

↓

Healing Plan

↓

Personalized Experience

↓

New Evidence

This becomes the canonical workflow.

Chapter 5 — Development Rules

Capture the engineering practices we've been following:

One meaningful change at a time.
Keep the build green after each milestone.
Business logic belongs in the domain layer.
UI components should not contain domain logic.
Framework files define behavior; engines execute behavior.
Services orchestrate; repositories persist.
Every recommendation must be explainable.
New evidence sources integrate through the Evidence Pipeline.