"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assessments } from "@/data/assessments";


type AssessmentResult = {
  assessmentId: string;
  title: string;
  category?: string;

  score: number;
  maxScore: number;

  level: string;
  message: string;

  wellbeingDimension?: string;

  strengths?: string[];

  growthAreas?: string[];

  reflectionPrompt?: string;

  recommendedJourney?: string;

  nextAction?:
    | "journal"
    | "journey"
    | "therapist"
    | "assessment";
};



export default function AssessmentResultPage() {


  const params = useParams();

  const slug = params.slug as string;



  const [result, setResult] =
    useState<AssessmentResult | null>(null);

  useEffect(() => {


    const stored =
      sessionStorage.getItem(
        "assessmentResult"
      );

    if (stored) {

      setResult(
        JSON.parse(stored)
      );

    }


  }, []);


  if (!result) {


    return (

      <main className="min-h-screen bg-[#F7F3EC] p-10">

        <p className="font-bold text-[#0F4C5C]">

          Loading results...

        </p>


      </main>

    );

  }





  const assessment =
    assessments.find(
      (item) =>
        item.id === slug
    );






  if (!assessment) {


    return (

      <main className="min-h-screen bg-[#F7F3EC] p-10">

        <p className="font-bold text-[#0F4C5C]">

          Assessment not found.

        </p>


      </main>

    );

  }








  return (

    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">


      <div className="mx-auto max-w-5xl">






        <section
          className="
          rounded-3xl
          bg-gradient-to-r
          from-[#0F4C5C]
          to-[#2C7A7B]
          p-8
          text-white
          shadow-lg
          "
        >


          <p className="font-bold uppercase tracking-wide">

            Assessment Complete

          </p>


          <h1 className="mt-3 text-4xl font-bold">

            {assessment.title}

          </h1>


        </section>







        <section
          className="
          mt-8
          rounded-3xl
          bg-white
          p-8
          text-center
          shadow-lg
          "
        >





          <div
            className="
            mx-auto
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            bg-[#F7F3EC]
            "
          >

            <span
              className="
              text-5xl
              font-bold
              text-[#0F4C5C]
              "
            >

              {result.score}

            </span>


          </div>







          <h2
            className="
            mt-6
            text-3xl
            font-bold
            text-[#0F4C5C]
            "
          >

            {result.level}

          </h2>







          <p
            className="
            mt-4
            text-lg
            font-semibold
            leading-8
            text-gray-700
            "
          >

            {result.message}

          </p>

{result.wellbeingDimension && (
  <section
    className="
    mt-8
    rounded-3xl
    bg-white
    p-8
    shadow-lg
    "
  >
    <h3 className="text-2xl font-bold text-[#0F4C5C]">
      Your Wellbeing Snapshot
    </h3>

    <div className="mt-6 grid gap-6 md:grid-cols-2">

      <div className="rounded-2xl bg-[#F7F3EC] p-5">
        <p className="text-sm font-bold uppercase text-gray-500">
          Wellbeing Dimension
        </p>

        <p className="mt-2 text-xl font-bold text-[#0F4C5C]">
          {result.wellbeingDimension}
        </p>
      </div>

      <div className="rounded-2xl bg-[#F7F3EC] p-5">
        <p className="text-sm font-bold uppercase text-gray-500">
          Current Result
        </p>

        <p className="mt-2 text-xl font-bold text-[#0F4C5C]">
          {result.level}
        </p>
      </div>

    </div>

    <p className="mt-6 leading-7 text-gray-700">
      This assessment contributes to your Living Wellbeing Profile
      and helps personalise your future recommendations and
      self-discovery journey.
    </p>

  </section>
)}

{result.strengths && result.strengths.length > 0 && (

  <section
    className="
    mt-8
    rounded-3xl
    bg-white
    p-8
    shadow-lg
    "
  >

    <h3
      className="
      text-2xl
      font-bold
      text-[#0F4C5C]
      "
    >
      Your Strengths
    </h3>

    <p className="mt-2 text-gray-600">
      Every assessment identifies positive qualities you can continue
      building on.
    </p>

    <ul className="mt-6 space-y-4">

      {result.strengths.map((strength) => (

        <li
          key={strength}
          className="
          flex
          items-start
          gap-3
          rounded-2xl
          bg-[#F7F3EC]
          p-4
          "
        >

          <span className="text-xl">
            ✓
          </span>

          <span className="font-semibold text-gray-700">
            {strength}
          </span>

        </li>

      ))}

    </ul>

  </section>

)}

{result.growthAreas && result.growthAreas.length > 0 && (

  <section
    className="
    mt-8
    rounded-3xl
    bg-white
    p-8
    shadow-lg
    "
  >

    <h3
      className="
      text-2xl
      font-bold
      text-[#0F4C5C]
      "
    >
      Areas To Explore
    </h3>

    <p className="mt-2 text-gray-600">
      These are opportunities for continued personal growth and
      emotional wellbeing.
    </p>

    <ul className="mt-6 space-y-4">

      {result.growthAreas.map((area) => (

        <li
          key={area}
          className="
          flex
          items-start
          gap-3
          rounded-2xl
          bg-[#F7F3EC]
          p-4
          "
        >

          <span className="text-xl">
            •
          </span>

          <span className="font-semibold text-gray-700">
            {area}
          </span>

        </li>

      ))}

    </ul>

  </section>

)}

{result.reflectionPrompt && (

  <section
    className="
    mt-8
    rounded-3xl
    border
    border-[#D7C8A5]
    bg-[#FFFDF8]
    p-8
    shadow-lg
    "
  >

    <p
      className="
      text-sm
      font-bold
      uppercase
      tracking-wide
      text-[#8B6F3D]
      "
    >
      Reflection
    </p>

    <h3
      className="
      mt-3
      text-2xl
      font-bold
      text-[#0F4C5C]
      "
    >
      Take a Moment
    </h3>

    <p
      className="
      mt-5
      text-lg
      italic
      leading-8
      text-gray-700
      "
    >
      "{result.reflectionPrompt}"
    </p>

    <p
      className="
      mt-6
      leading-7
      text-gray-600
      "
    >
      There is no right or wrong answer. Spend a few minutes reflecting
      before moving to your next step.
    </p>

  </section>

)}



          <div
            className="
            mt-8
            rounded-2xl
            bg-[#F7F3EC]
            p-6
            text-left
            "
          >


            <h3
              className="
              text-xl
              font-bold
              text-[#0F4C5C]
              "
            >

              Next Steps

            </h3>




            <p
              className="
              mt-3
              leading-7
              text-gray-700
              "
            >

              This self-assessment supports awareness
              and reflection. It does not replace
              professional diagnosis.

              If you would like personalised support,
              a MyDeepTalk therapist can help you
              explore your concerns further.

            </p>


          </div>

<section
  className="
  mt-8
  rounded-3xl
  bg-gradient-to-r
  from-[#0F4C5C]
  to-[#2C7A7B]
  p-8
  text-white
  shadow-lg
  "
>
  <p className="font-bold uppercase tracking-wide">
    Recommended Next Step
  </p>

  <h3 className="mt-3 text-3xl font-bold">

    {result.nextAction === "journey" &&
      "Continue Your Self-Discovery Journey"}

    {result.nextAction === "journal" &&
      "Spend Time Reflecting In Your Journal"}

    {result.nextAction === "therapist" &&
      "Connect With A MyDeepTalk Therapist"}

    {result.nextAction === "assessment" &&
      "Explore Another Assessment"}

  </h3>

  <p className="mt-4 leading-8">

    {result.nextAction === "journey" &&
      "Your responses suggest that continuing your guided self-discovery journey is a meaningful next step."}

    {result.nextAction === "journal" &&
      "Writing about your experiences can help you better understand your thoughts and emotions."}

    {result.nextAction === "therapist" &&
      "Speaking with a qualified therapist can provide personalised guidance and support."}

    {result.nextAction === "assessment" &&
      "Exploring another assessment can help you build a broader understanding of your wellbeing."}

  </p>
</section>



          <div className="mt-8 flex flex-wrap justify-center gap-4">



            <Link

              href={`/assessments/${assessment.id}`}

              className="
              rounded-full
              border
              border-[#0F4C5C]
              px-8
              py-4
              font-bold
              text-[#0F4C5C]
              "

            >

              Retake Assessment

            </Link>






            <Link

              href="/therapists"

              className="
              rounded-full
              bg-[#0F4C5C]
              px-8
              py-4
              font-bold
              text-white
              "

            >

              Find A Therapist

            </Link>



          </div>





        </section>





      </div>


    </main>

  );


}