"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

type AvailabilitySlot = {
  date: string;
  startTime: string;
  endTime: string;
  booked: boolean;
};


const durations = [30,45,60,90];


function calculateEndTime(start:string, duration:number){

  const [hours,minutes] = start.split(":").map(Number);

  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes + duration);


  return `${String(date.getHours()).padStart(2,"0")}:${String(
    date.getMinutes()
  ).padStart(2,"0")}`;

}



export default function TherapistAvailabilityPage(){

const router = useRouter();


const [date,setDate]=useState("");

const [duration,setDuration]=useState(60);

const [startTime,setStartTime]=useState("");

const [slots,setSlots]=useState<AvailabilitySlot[]>([]);

const [loading,setLoading]=useState(false);

const [pageLoading,setPageLoading]=useState(true);



useEffect(()=>{

async function load(){

const user=auth.currentUser;

if(!user){
setPageLoading(false);
return;
}


try{

const snap=await getDoc(
doc(db,"therapistAvailability",user.uid)
);


if(snap.exists()){

const data=snap.data();


if(Array.isArray(data.availableSlots)){
setSlots(data.availableSlots);
}

}


}catch(error){

console.error(error);

}finally{

setPageLoading(false);

}

}


load();


},[]);



function addSlot(){

if(!date || !startTime){

alert("Please select date and start time");

return;

}


const endTime=calculateEndTime(
startTime,
duration
);


const exists=slots.some(
(slot)=>
slot.date===date &&
slot.startTime===startTime
);


if(exists){

alert("This slot already exists");

return;

}



setSlots([
...slots,
{
date,
startTime,
endTime,
booked:false
}
]);


setStartTime("");

}



function removeSlot(index:number){

setSlots(
slots.filter((_,i)=>i!==index)
);

}




async function saveAvailability(){

const user=auth.currentUser;


if(!user){

alert("Please login");

return;

}


if(slots.length===0){

alert("Please add at least one availability slot");

return;

}



setLoading(true);


try{


await setDoc(

doc(db,"therapistAvailability",user.uid),

{

therapistId:user.uid,

availabilityMode:"calendar",

sessionDuration:duration,

availableSlots:slots,

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

)

}





return(

<main className="min-h-screen bg-[#F7F3EC] px-6 py-10">

<div className="mx-auto max-w-5xl">


<section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">

<p className="font-bold uppercase">
Therapist Availability
</p>


<h1 className="mt-3 text-4xl font-bold">
Create Your Booking Calendar
</h1>


<p className="mt-4 text-lg font-semibold">
Choose dates and exact session times clients can book.
</p>


</section>




<section className="mt-8 rounded-3xl bg-white p-8 shadow-lg">


<label className="font-bold text-[#0F4C5C]">
Choose Date
</label>


<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

className="mt-3 w-full rounded-2xl border p-4 font-semibold"

/>



<label className="mt-6 block font-bold text-[#0F4C5C]">
Session Duration
</label>


<select

value={duration}

onChange={(e)=>setDuration(Number(e.target.value))}

className="mt-3 w-full rounded-2xl border p-4 font-semibold"

>


{durations.map(item=>(

<option key={item} value={item}>
{item} minutes
</option>

))}


</select>




<label className="mt-6 block font-bold text-[#0F4C5C]">
Session Start Time
</label>


<input

type="time"

value={startTime}

onChange={(e)=>setStartTime(e.target.value)}

className="mt-3 w-full rounded-2xl border p-4 font-semibold"

/>



<button

onClick={addSlot}

className="mt-6 rounded-full bg-[#2C7A7B] px-8 py-3 font-bold text-white"

>

Add Availability Slot

</button>






<section className="mt-10">


<h2 className="text-xl font-bold text-[#0F4C5C]">
Your Slots
</h2>


{slots.map((slot,index)=>(

<div

key={index}

className="mt-4 flex items-center justify-between rounded-2xl bg-[#F7F3EC] p-5"

>


<div>

<p className="font-bold text-[#0F4C5C]">
{slot.date}
</p>


<p className="font-semibold">
{slot.startTime} - {slot.endTime}
</p>


</div>


<button

onClick={()=>removeSlot(index)}

className="rounded-full bg-red-700 px-4 py-2 font-bold text-white"

>

Remove

</button>


</div>

))}


</section>





<button

onClick={saveAvailability}

disabled={loading}

className="mt-10 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white"

>

{loading?"Saving...":"Save Availability"}

</button>



</section>



</div>


</main>

)

}