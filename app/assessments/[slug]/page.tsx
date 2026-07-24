"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { assessments } from "@/data/assessments";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { AssessmentIntelligenceService } from "@/lib/intelligence/services/AssessmentIntelligenceService";

export default function AssessmentQuestionnairePage() {

  const params = useParams();
  const router = useRouter();
  
  const assessmentIntelligence =
  new AssessmentIntelligenceService();
  

  const slug = Array.isArray(params.slug)
  ? params.slug[0]
  : params.slug;


  const assessment = assessments.find(
    (item) => item.id === slug
  );



  const [currentQuestion, setCurrentQuestion] =
    useState(0);


  const [answers, setAnswers] =
    useState<Record<number, number>>({});


  const [selectedScore, setSelectedScore] =
    useState<number | null>(null);




  if (!assessment) {

    return (

      <main className="min-h-screen bg-[#F7F3EC] p-10">

        <h1 className="text-3xl font-bold text-[#0F4C5C]">

          Assessment not found

        </h1>

      </main>

    );

  }




  const question =
    assessment.questions[currentQuestion];





  async function handleNext() {
	  
	if (!assessment) {
      return;
    }


    if (selectedScore === null) {

      alert("Please select an answer");

      return;

    }



    const updatedAnswers = {

      ...answers,

      [currentQuestion]: selectedScore,

    };



    setAnswers(updatedAnswers);




    if (
      currentQuestion <
      assessment.questions.length - 1
    ) {


      setCurrentQuestion(
        currentQuestion + 1
      );


      setSelectedScore(
        updatedAnswers[currentQuestion + 1] ?? null
      );


    } else {


      const totalScore =
        Object.values(updatedAnswers)
          .reduce(
            (sum, value) =>
              sum + value,
            0
          );

console.log("Reached end of assessment");
console.log("Total score:", totalScore);



      const matchingResult =
        assessment.results.find(
          (result) =>
            totalScore >= result.minScore &&
            totalScore <= result.maxScore
        );
		console.log("Matching result:", matchingResult);
		
		const user = auth.currentUser;
		
		console.log("Current user:", user);

console.log("About to process assessment...");
if (
  user &&
  matchingResult?.wellbeingDimension
) {		
assessmentIntelligence.processAssessment(
  user.uid,
  {
    assessmentId: assessment.id,
    score: totalScore,
    maxScore: assessment.questions.length * 3,
    wellbeingDimension: matchingResult?.wellbeingDimension,
  }
);
}

console.log("Current user UID:", user?.uid);
console.log("Current user email:", user?.email);

try {
  const docRef = await addDoc(
    collection(db, "assessmentResults"),
    {
      assessmentId: assessment.id,
      title: assessment.title,
      category: assessment.category,
      userId: user?.uid || null,
      userEmail: user?.email || null,
      isAnonymous: !user,
      score: totalScore,
      maxScore: assessment.questions.length * 3,
      level: matchingResult?.level || "Unknown",
      message:
        matchingResult?.message ||
        "Your assessment has been completed.",
      createdAt: serverTimestamp(),
    }
  );

  console.log("Assessment saved:", docRef.id);
} catch (error) {
  console.error("Failed to save assessment:", error);
}





      sessionStorage.setItem(

        "assessmentResult",

        JSON.stringify({

          assessmentId:
            assessment.id,


          title:
            assessment.title,


          category:
            assessment.category,


          score:
            totalScore,


          maxScore:
            assessment.questions.length * 3,


          level:
            matchingResult?.level ||
            "Unknown",


          message:
            matchingResult?.message ||
            "Your assessment has been completed.",
			
		
		  wellbeingDimension:
        matchingResult?.wellbeingDimension,
      
      strengths:
        matchingResult?.strengths,
      
      growthAreas:
        matchingResult?.growthAreas,
      
      reflectionPrompt:
        matchingResult?.reflectionPrompt,
      
      recommendedJourney:
        matchingResult?.recommendedJourney,
      
      nextAction:
        matchingResult?.nextAction,

        })

      );





      router.push(
        `/assessments/${assessment.id}/result`
      );


    }


  }







  function handleBack() {


    if (currentQuestion > 0) {


      setCurrentQuestion(
        currentQuestion - 1
      );


      setSelectedScore(
        answers[currentQuestion - 1] ?? null
      );


    }

  }






  return (

    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">


      <div className="mx-auto max-w-4xl">





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

            Self Assessment

          </p>



          <h1 className="mt-3 text-4xl font-bold">

            {assessment.title}

          </h1>




          <p className="mt-4 font-semibold">

            Question {currentQuestion + 1}
            {" "}of{" "}
            {assessment.questions.length}

          </p>



          <div className="mt-5 h-2 rounded-full bg-white/30">

            <div

              className="
              h-2
              rounded-full
              bg-white
              transition-all
              "

              style={{

                width:
                  `${
                    ((currentQuestion + 1) /
                    assessment.questions.length) *
                    100
                  }%`

              }}

            />


          </div>



        </section>







        <section
          className="
          mt-8
          rounded-3xl
          bg-white
          p-8
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

            {question.question}

          </h2>






          <div className="mt-8 space-y-4">


            {question.options.map((option) => (


              <button

                key={option.text}

                onClick={() =>
                  setSelectedScore(
                    option.score
                  )
                }


                className={`
                w-full
                rounded-2xl
                border
                p-4
                text-left
                font-bold
                transition

                ${
                  selectedScore === option.score
                    ? "border-[#0F4C5C] bg-[#F7F3EC]"
                    : "border-gray-200 bg-white"
                }

                `}

              >

                {option.text}


              </button>


            ))}


          </div>








          <div className="mt-8 flex gap-4">


            {currentQuestion > 0 && (

              <button

                onClick={handleBack}

                className="
                w-1/3
                rounded-full
                border
                border-[#0F4C5C]
                p-4
                font-bold
                text-[#0F4C5C]
                "

              >

                Back

              </button>

            )}






            <button

              onClick={handleNext}

              className="
              flex-1
              rounded-full
              bg-[#0F4C5C]
              p-4
              font-bold
              text-white
              hover:bg-[#0b3945]
              "

            >

              {currentQuestion === assessment.questions.length - 1

                ? "View Results"

                : "Next Question"

              }


            </button>



          </div>





        </section>





      </div>


    </main>

  );


}