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