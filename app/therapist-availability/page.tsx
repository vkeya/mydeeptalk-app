"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const hours = Array.from({ length: 24 }, (_, i) =>
  `${String(i).padStart(2, "0")}:00`
);

type AvailabilityDate = {
  date: string;
  slots: string[];
};

export default function TherapistAvailabilityPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("");
  const [availabilityDates, setAvailabilityDates] = useState<
    AvailabilityDate[]
  >([]);

  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);


  useEffect(() => {
    async function loadAvailability() {
      const user = auth.currentUser;

      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        const ref = doc(db, "therapistAvailability", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          if (Array.isArray(data.availableDates)) {
            setAvailabilityDates(data.availableDates);
          }
        }

      } catch (error) {
        console.error("Error loading availability:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadAvailability();

  }, []);


  function selectSlot(time:string){

    setSelectedSlots((previous)=>{

      if(previous.includes(time)){
        return previous.filter(item=>item !== time);
      }

      return [...previous,time];

    });

  }


  function addDateAvailability(){

    if(!selectedDate){
      alert("Please select a date");
      return;
    }

    if(selectedSlots.length===0){
      alert("Please select at least one available time");
      return;
    }


    const existing =
      availabilityDates.filter(
        item=>item.date !== selectedDate
      );


    setAvailabilityDates([
      ...existing,
      {
        date:selectedDate,
        slots:selectedSlots.sort()
      }
    ]);


    setSelectedSlots([]);

  }



  async function handleSave(){

    const user = auth.currentUser;

    if(!user){
      alert("Please login first");
      return;
    }


    setLoading(true);


    try{

      await setDoc(
        doc(db,"therapistAvailability",user.uid),
        {
          therapistId:user.uid,

          availabilityMode:"calendar",

          availableDates:availabilityDates,

          updatedAt:serverTimestamp()
        },
        {
          merge:true
        }
      );


      router.push("/dashboard");


    }catch(error){

      console.error(error);
      alert("Could not save availability");

    }finally{

      setLoading(false);

    }

  }



  if(pageLoading){

    return(
      <main className="min-h-screen bg-[#F7F3EC] p-10">
        <p className="font-bold text-[#0F4C5C]">
          Loading availability...
        </p>
      </main>
    );

  }



return (

<main className="min-h-screen bg-[#F7F3EC] px-6 py-10">

<div className="mx-auto max-w-5xl">


<section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">


<p className="mb-3 font-bold uppercase tracking-wide">
Therapist Availability
</p>


<h1 className="text-4xl font-bold md:text-5xl">
Choose Your Available Sessions
</h1>


<p className="mt-4 max-w-3xl text-lg font-semibold leading-8">
Select a date and the exact hours you want clients to book.
</p>


</section>




<section className="mt-8 rounded-3xl bg-white p-8 shadow-lg">


<label className="block font-bold text-[#0F4C5C]">
Choose Date
</label>


<input

type="date"

value={selectedDate}

onChange={(e)=>setSelectedDate(e.target.value)}

className="mt-3 w-full rounded-2xl border p-4 font-semibold"

/>



<h2 className="mt-8 text-xl font-bold text-[#0F4C5C]">
Available Hours
</h2>


<div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">


{hours.map(hour=>(

<button

key={hour}

type="button"

onClick={()=>selectSlot(hour)}

className={`rounded-xl p-3 font-bold border

${
selectedSlots.includes(hour)

?
"bg-[#0F4C5C] text-white"

:
"bg-[#F7F3EC] text-gray-900"

}

`}

>

{hour}

</button>

))}


</div>




<button

type="button"

onClick={addDateAvailability}

className="mt-8 rounded-full bg-[#2C7A7B] px-8 py-3 font-bold text-white"

>

Add Date Availability

</button>





<div className="mt-10">


<h2 className="text-xl font-bold text-[#0F4C5C]">
Your Availability
</h2>



{availabilityDates.map(item=>(

<div

key={item.date}

className="mt-4 rounded-2xl bg-[#F7F3EC] p-5"

>

<p className="font-bold text-[#0F4C5C]">
{item.date}
</p>


<p className="mt-2 font-semibold">

{item.slots.join(", ")}

</p>


</div>


))}


</div>





<button

onClick={handleSave}

disabled={loading}

className="mt-10 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white"

>

{loading?"Saving...":"Save Availability"}

</button>



</section>


</div>

</main>


);

}