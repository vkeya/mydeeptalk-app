"use client";

import Link from "next/link";
import { assessments } from "@/data/assessments";


const assessmentIcons: Record<string, string> = {
  anxiety: "🧠",
  burnout: "⚡",
  "substance-use": "🌱",
};


export default function AssessmentsPage() {


  return (

    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">


      <div className="mx-auto max-w-6xl">


        <section
          className="
          rounded-3xl
          bg-gradient-to-r
          from-[#0F4C5C]
          to-[#2C7A7B]
          p-8
          text-white
          shadow-lg
          md:p-10
          "
        >


          <p className="mb-3 font-bold uppercase tracking-wide">
            MyDeepTalk Wellness Tools
          </p>


          <h1 className="text-4xl font-bold md:text-5xl">
            Self Assessments
          </h1>


          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8">
            Complete confidential wellness assessments designed to help you
            reflect on your emotional wellbeing, stress levels, and support
            needs.
          </p>


        </section>





        <section
          className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          "
        >



        {assessments.map((assessment) => (


          <article

            key={assessment.id}

            className="
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            transition
            hover:-translate-y-1
            "

          >



            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#F7F3EC]
              text-3xl
              "
            >

              {assessmentIcons[assessment.id] ?? "💬"}

            </div>




            <h2
              className="
              mt-5
              text-2xl
              font-bold
              text-[#0F4C5C]
              "
            >

              {assessment.title}

            </h2>




            <p
              className="
              mt-3
              leading-7
              text-gray-700
              "
            >

              {assessment.description}

            </p>




            <div
              className="
              mt-5
              space-y-2
              text-sm
              font-bold
              text-gray-900
              "
            >


              <p>
                Category:
                <span className="ml-2 text-[#0F4C5C]">
                  {assessment.category}
                </span>
              </p>



              <p>
                Duration:
                <span className="ml-2 text-[#0F4C5C]">
                  {assessment.duration}
                </span>
              </p>



              <p>
                Questions:
                <span className="ml-2 text-[#0F4C5C]">
                  {assessment.questions.length}
                </span>
              </p>


            </div>




            <div
              className="
              mt-5
              rounded-xl
              bg-[#F7F3EC]
              p-3
              text-sm
              font-semibold
              text-gray-700
              "
            >

              Confidential self-reflection tool.
              Results are designed to guide awareness and support decisions.

            </div>





            <Link

              href={`/assessments/${assessment.id}`}

              className="
              mt-6
              block
              rounded-full
              bg-[#0F4C5C]
              px-6
              py-3
              text-center
              font-bold
              text-white
              hover:bg-[#0b3945]
              "

            >

              Start Assessment

            </Link>




          </article>


        ))}



        </section>





        <section
          className="
          mt-10
          rounded-3xl
          bg-white
          p-6
          shadow-lg
          "
        >


          <h2
            className="
            text-2xl
            font-bold
            text-[#0F4C5C]
            "
          >

            Important Note

          </h2>




          <p
            className="
            mt-3
            leading-7
            text-gray-700
            "
          >

            These assessments support self-awareness and reflection.
            They are not a medical diagnosis. If your results raise concerns,
            consider speaking with a qualified MyDeepTalk therapist.

          </p>


        </section>



      </div>


    </main>

  );

}