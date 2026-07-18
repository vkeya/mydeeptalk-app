"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import TherapistAgreementModal from "@/components/TherapistAgreementModal";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const specialtyOptions = [
  "Relationships",
  "Marriage & Couples Therapy",
  "Parenting",
  "Parent-Child Relationships",
  "Trauma & Healing",
  "Anxiety",
  "Depression",
  "Stress & Burnout",
  "Grief & Loss",
  "Addiction & Recovery",
  "Self-Esteem",
  "Emotional Regulation",
  "Life Transitions",
  "Youth & Teen Counseling",
  "Faith-Based Counseling",
];

const therapyStyleOptions = [
  "Warm & Compassionate",
  "Gentle & Supportive",
  "Structured & Goal-Oriented",
  "Solution-Focused",
  "Insight-Oriented",
  "Trauma-Informed",
  "Strength-Based",
  "Holistic",
  "Faith-Based",
  "Integrative",
];

const clientTypeOptions = [
  "Children",
  "Adolescents",
  "Young Adults",
  "Adults",
  "Couples",
  "Families",
  "Parents",
  "Students",
  "Professionals",
  "Seniors",
];

const professionalTitleOptions = [
  "Clinical Psychologist",
  "Counselling Psychologist",
  "Psychotherapist",
  "Psychiatrist",
  "Marriage & Family Therapist",
  "Licensed Professional Counselor",
  "Mental Health Counselor",
  "Clinical Social Worker",
  "Addiction Counselor",
  "Behavioral Therapist",
  "Other",
];


export default function TherapistProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [languages, setLanguages] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [cpbLicenseNumber, setCpbLicenseNumber] = useState("");

  const [feeCurrency, setFeeCurrency] = useState("KES");

  const [offersPhysicalSessions, setOffersPhysicalSessions] = useState(false);
  
  const [therapyStyles, setTherapyStyles] = useState<string[]>([]);
const [preferredClientTypes, setPreferredClientTypes] = useState<string[]>([]);
const [sessionApproach, setSessionApproach] = useState("");
const [homeworkFrequency, setHomeworkFrequency] = useState("");
const [sessionFocus, setSessionFocus] = useState("");

const [sessionFees, setSessionFees] = useState({
  virtual: {
    individual: "",
    couple: "",
    childAdolescent: "",
    family: "",
  },
  physical: {
    individual: "",
    couple: "",
    childAdolescent: "",
    family: "",
  },
});

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState("");
  
  const [professionalTitle, setProfessionalTitle] = useState("");
  
  const [licenseAuthority, setLicenseAuthority] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoPositionX, setPhotoPositionX] = useState(50);
  const [photoPositionY, setPhotoPositionY] = useState(50);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        setCurrentUserId(user.uid);

        const userSnap = await getDoc(doc(db, "users", user.uid));

        if (userSnap.exists()) {
          setAgreementAccepted(
            userSnap.data().therapistAgreementAccepted === true
          );
        }

        const profileSnap = await getDoc(doc(db, "therapists", user.uid));

        if (profileSnap.exists()) {
          const data = profileSnap.data();
          
		  
          setExistingProfile(data);
		  setCountry(data.country || "");
setState(data.state || "");
setCity(data.city || "");
setTimezone(data.timezone || "");

setProfessionalTitle(data.professionalTitle || "");

setLicenseAuthority(
  data.licenseAuthority || "Counsellors & Psychologists Board"
);

setLicenseCountry(
  data.licenseCountry || data.country || ""
);

setLicenseNumber(
  data.licenseNumber || data.cpbLicenseNumber || ""
);
          setFullName(data.fullName || "");
		  setAge(data.age ? String(data.age) : "");
          setGender(data.gender || "");
          setBio(data.bio || "");
          setFeeCurrency(data.feeCurrency || data.currency || "KES");
          setCpbLicenseNumber(data.cpbLicenseNumber || "");
		  
		  const therapyProfile = data.therapyProfile || {};

setTherapyStyles(
  therapyProfile.therapyStyles || []
);

setPreferredClientTypes(
  therapyProfile.preferredClientTypes || []
);

setSessionApproach(
  therapyProfile.sessionApproach || ""
);

setHomeworkFrequency(
  therapyProfile.homeworkFrequency || ""
);

setSessionFocus(
  therapyProfile.sessionFocus || ""
);

          setSpecialties(
            Array.isArray(data.specialties)
              ? data.specialties
              : typeof data.specialties === "string"
              ? data.specialties
                  .split(",")
                  .map((item: string) => item.trim())
                  .filter(Boolean)
              : []
          );

          setLanguages(
            Array.isArray(data.languages) ? data.languages.join(", ") : ""
          );

          setYearsExperience(data.yearsExperience?.toString() || "");

          setOffersPhysicalSessions(
  data.offersPhysicalSessions || false
);

setSessionFees({
  virtual: {
    individual:
      data.sessionFees?.virtual?.individual?.toString() ||
      data.sessionFees?.individual?.toString() ||
      data.sessionFee?.toString() ||
      "",
    couple:
      data.sessionFees?.virtual?.couple?.toString() ||
      data.sessionFees?.couple?.toString() ||
      "",
    childAdolescent:
      data.sessionFees?.virtual?.childAdolescent?.toString() ||
      data.sessionFees?.childAdolescent?.toString() ||
	  data.sessionFees?.parentChild?.toString() ||
      "",
    family:
      data.sessionFees?.virtual?.family?.toString() ||
      data.sessionFees?.family?.toString() ||
      "",
  },

  physical: {
    individual:
      data.sessionFees?.physical?.individual?.toString() || "",
    couple:
      data.sessionFees?.physical?.couple?.toString() || "",
    childAdolescent:
      data.sessionFees?.physical?.childAdolescent?.toString() || "",
    family:
      data.sessionFees?.physical?.family?.toString() || "",
  },
});

          
          setPhotoPreview(data.profilePhoto || data.photoUrl || "");
          setPhotoPositionX(data.photoPositionX ?? 50);
          setPhotoPositionY(data.photoPositionY ?? 50);
        }
      } catch (error) {
        console.error("Error loading therapist profile:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadProfile();
  }, []);

  function toggleSpecialty(item: string) {
    if (specialties.includes(item)) {
      setSpecialties(specialties.filter((specialty) => specialty !== item));
    } else {
      setSpecialties([...specialties, item]);
    }
  }
  
  function toggleTherapyStyle(style: string) {
  if (therapyStyles.includes(style)) {
    setTherapyStyles(
      therapyStyles.filter((item) => item !== style)
    );
  } else if (therapyStyles.length < 3) {
    setTherapyStyles([...therapyStyles, style]);
  }
}

function toggleClientType(type: string) {
  if (preferredClientTypes.includes(type)) {
    setPreferredClientTypes(
      preferredClientTypes.filter((item) => item !== type)
    );
  } else {
    setPreferredClientTypes([
      ...preferredClientTypes,
      type,
    ]);
  }
}

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoPositionX(50);
    setPhotoPositionY(50);
	setRemovePhoto(false);

    e.target.value = "";
  }
  
  function handleRemovePhoto() {
    setPhotoFile(null);
    setPhotoPreview("");
    setPhotoPositionX(50);
    setPhotoPositionY(50);
    setRemovePhoto(true);
}	
 function handleDrag(e: React.MouseEvent<HTMLDivElement>) {
  if (!dragging) return;

  setPhotoPositionX((prev) =>
    Math.max(0, Math.min(100, prev - e.movementX * 0.3))
  );

  setPhotoPositionY((prev) =>
    Math.max(0, Math.min(100, prev - e.movementY * 0.3))
  );
}


  async function uploadToCloudinary(file: File, folder: string) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary environment variables are missing.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Cloudinary upload failed.");
    }

    return data.secure_url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!agreementAccepted) {
      alert(
        "Please accept the Professional Services Agreement before continuing."
      );
      return;
    }

    if (specialties.length === 0) {
      alert("Please select at least one specialty.");
      return;
    }

    if (!cpbLicenseNumber.trim()) {
      alert("Please enter your CPB license number.");
      return;
    }
	
	if (!age || Number(age) < 18) {
      alert("Please enter a valid age.");
      return;
    }

    setLoading(true);

    try {
      let uploadedPhotoUrl = "";

      if (photoFile) {
        uploadedPhotoUrl = await uploadToCloudinary(
          photoFile,
          `mydeeptalk/therapist-photos/${user.uid}`
        );
      }

      const finalPhotoUrl = removePhoto
	   ? ""
       : uploadedPhotoUrl ||
         existingProfile?.profilePhoto ||
         existingProfile?.photoUrl ||
        "";

      await setDoc(
        doc(db, "therapists", user.uid),
        {
          uid: user.uid,
          email: user.email,
          fullName,
          gender,
		  age: Number(age),
          bio,
          specialties,
          languages: languages
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          yearsExperience: Number(yearsExperience),

          // Legacy field (keep for backward compatibility)
          cpbLicenseNumber: cpbLicenseNumber.trim(),
          
          // New global fields
          professionalTitle,
          licenseNumber,
          licenseAuthority,
          licenseCountry,
          
          country,
          state,
          city,
          timezone,
          
          feeCurrency,
          currency: feeCurrency,

          offersPhysicalSessions,
		  therapyProfile: {
  therapyStyles,
  preferredClientTypes,
  sessionApproach,
  homeworkFrequency,
  sessionFocus,
},

sessionFees: {
  virtual: {
    individual: Number(sessionFees.virtual.individual || 0),
    couple: Number(sessionFees.virtual.couple || 0),
    childAdolescent: Number(sessionFees.virtual.childAdolescent || 0),
    family: Number(sessionFees.virtual.family || 0),
  },

  physical: {
    individual: Number(sessionFees.physical.individual || 0),
    couple: Number(sessionFees.physical.couple || 0),
    childAdolescent: Number(sessionFees.physical.childAdolescent || 0),
    family: Number(sessionFees.physical.family || 0),
  },
},

// Backward compatibility
sessionFee: Number(sessionFees.virtual.individual || 0),

          
          profilePhoto: finalPhotoUrl,
          photoUrl: finalPhotoUrl,
          photoPositionX,
          photoPositionY,
          storageProvider: finalPhotoUrl ? "cloudinary" : "",
          status: existingProfile?.status || "pending",
          credentialsStatus:
            existingProfile?.credentialsStatus || "not_uploaded",
          credentialsUploaded: existingProfile?.credentialsUploaded || false,
          profileComplete: true,
          createdAt: existingProfile?.createdAt || serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert(
        existingProfile
          ? "Profile updated successfully"
          : "Profile saved successfully"
      );

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Therapist profile save error:", error);
      alert(error.message || "Error saving profile.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-8">
        <p className="font-bold text-[#0F4C5C]">
          Loading therapist profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      {currentUserId && !agreementAccepted && (
        <TherapistAgreementModal
          userId={currentUserId}
          onAccepted={() => setAgreementAccepted(true)}
        />
      )}

      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Therapist Profile
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Complete Your Professional Profile
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Complete your professional profile so clients can find, understand,
            and trust your work.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                Profile Photo
              </label>

              {photoPreview ? (
  <div className="mb-4">
    <div
      className="relative h-36 w-36 overflow-hidden rounded-full shadow cursor-move"
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={handleDrag}
    >
      <img
        src={photoPreview}
        alt="Profile preview"
        className="h-full w-full object-cover select-none pointer-events-none"
        draggable={false}
        style={{
          objectPosition: `${photoPositionX}% ${photoPositionY}%`,
        }}
      />
    </div>

    <p className="mt-2 text-xs text-gray-500">
      Drag photo to reposition
    </p>
  </div>
) : (
           
                <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 shadow">
                  No photo
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <div className="flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
  >
    Choose Profile Photo
  </button>

  {photoPreview && (
    <button
      type="button"
      onClick={handleRemovePhoto}
      className="rounded-full border-2 border-red-600 bg-white px-6 py-3 font-bold text-red-600 hover:bg-red-600 hover:text-white"
    >
      Remove Photo
    </button>
  )}
</div>

           
            </div>

            <select
  className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
  value={professionalTitle}
  onChange={(e) => setProfessionalTitle(e.target.value)}
>
  <option value="">Professional Title</option>

  {professionalTitleOptions.map((title) => (
    <option key={title} value={title}>
      {title}
    </option>
  ))}
</select>

            <select
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
			
			<input
              type="number"
              min="18"
              max="100"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <textarea
              rows={5}
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Tell clients about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-4 block font-bold text-[#0F4C5C]">
                Select Your Specialties
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                {specialtyOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={specialties.includes(item)}
                      onChange={() => toggleSpecialty(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Languages, e.g. English, Swahili"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />

            <input
              type="number"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Years of Experience"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              required
            />

            <div className="rounded-2xl bg-[#F7F3EC] p-6 space-y-5">
  <h3 className="text-lg font-bold text-[#0F4C5C]">
    Professional License
  </h3>

  <input
    className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="License Number"
    value={licenseNumber}
    onChange={(e) => {
      setLicenseNumber(e.target.value);

      // Keep existing Kenyan compatibility
      setCpbLicenseNumber(e.target.value);
    }}
    required
  />

  <input
    className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="Licensing Authority"
    value={licenseAuthority}
    onChange={(e) => setLicenseAuthority(e.target.value)}
    required
  />

  <input
    className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="Country of License"
    value={licenseCountry}
    onChange={(e) => setLicenseCountry(e.target.value)}
    required
  />
</div>
			
			<div className="rounded-2xl bg-[#F7F3EC] p-6">
  <label className="mb-2 block text-lg font-bold text-[#0F4C5C]">
    Session Availability
  </label>

  <p className="mb-5 text-gray-700">
    Do you offer <span className="font-semibold">in-person (physical)</span> therapy sessions?
  </p>

  <div className="flex flex-wrap gap-4">
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-3 transition ${
        offersPhysicalSessions
          ? "border-[#0F4C5C] bg-[#0F4C5C] text-white"
          : "border-gray-300 bg-white text-gray-900"
      }`}
    >
      <input
        type="radio"
        name="physicalSessions"
        className="hidden"
        checked={offersPhysicalSessions}
        onChange={() => setOffersPhysicalSessions(true)}
      />
      <span className="text-lg">🏢</span>
      <span className="font-semibold">Yes</span>
    </label>

    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-3 transition ${
        !offersPhysicalSessions
          ? "border-[#0F4C5C] bg-[#0F4C5C] text-white"
          : "border-gray-300 bg-white text-gray-900"
      }`}
    >
      <input
        type="radio"
        name="physicalSessions"
        className="hidden"
        checked={!offersPhysicalSessions}
        onChange={() => setOffersPhysicalSessions(false)}
      />
      <span className="text-lg">💻</span>
      <span className="font-semibold">No, Virtual Only</span>
    </label>
  </div>
</div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-4 block font-bold text-[#0F4C5C]">
                Virtual Session Fees
              </label>

              <select
                className="mb-6 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                value={feeCurrency}
                onChange={(e) => setFeeCurrency(e.target.value)}
                required
              >
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
              </select>

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Individual Session Fee (${feeCurrency})`}
                  value={sessionFees.virtual.individual}
                  onChange={(e) =>
                    setSessionFees({
  ...sessionFees,
  virtual: {
    ...sessionFees.virtual,
    individual: e.target.value,
  },
})
                  }
                  required
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Couple Session Fee (${feeCurrency})`}
                  value={sessionFees.virtual.couple}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
  virtual: {
    ...sessionFees.virtual,
    couple: e.target.value,
  },
})
                  }
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Child & Adolescent Session Fee (${feeCurrency})`}
                  value={sessionFees.virtual.childAdolescent}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
  virtual: {
    ...sessionFees.virtual,
    childAdolescent: e.target.value,
  },
})
                  }
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Family Session Fee (${feeCurrency})`}
                  value={sessionFees.virtual.family}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
  virtual: {
    ...sessionFees.virtual,
    family: e.target.value,
  },
})
                  }
                />
              </div>
            </div>
			
			{offersPhysicalSessions && (
  <div className="mt-8 rounded-2xl bg-[#F7F3EC] p-6">
    <label className="mb-4 block font-bold text-[#0F4C5C]">
      Physical Session Fees
    </label>

    <div className="grid gap-6 md:grid-cols-2">

      <input
        type="number"
        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold"
        placeholder={`Individual (${feeCurrency})`}
        value={sessionFees.physical.individual}
        onChange={(e) =>
          setSessionFees({
            ...sessionFees,
            physical: {
              ...sessionFees.physical,
              individual: e.target.value,
            },
          })
        }
      />

      <input
        type="number"
        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold"
        placeholder={`Couple (${feeCurrency})`}
        value={sessionFees.physical.couple}
        onChange={(e) =>
          setSessionFees({
            ...sessionFees,
            physical: {
              ...sessionFees.physical,
              couple: e.target.value,
            },
          })
        }
      />

      <input
        type="number"
        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold"
        placeholder={`Child & Adolescent (${feeCurrency})`}
        value={sessionFees.physical.childAdolescent}
        onChange={(e) =>
          setSessionFees({
            ...sessionFees,
            physical: {
              ...sessionFees.physical,
              childAdolescent: e.target.value,
            },
          })
        }
      />

      <input
        type="number"
        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold"
        placeholder={`Family (${feeCurrency})`}
        value={sessionFees.physical.family}
        onChange={(e) =>
          setSessionFees({
            ...sessionFees,
            physical: {
              ...sessionFees.physical,
              family: e.target.value,
            },
          })
        }
      />

    </div>
  </div>
)}


            <div className="grid gap-6 md:grid-cols-2">
  <input
    className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="Country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    required
  />

  <input
    className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="State / Province"
    value={state}
    onChange={(e) => setState(e.target.value)}
  />

  <input
    className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    required
  />
  
  <input
  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
  placeholder="Timezone (e.g. Africa/Nairobi)"
  value={timezone}
  onChange={(e) => setTimezone(e.target.value)}
/>
</div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? existingProfile
                  ? "Updating..."
                  : "Saving..."
                : existingProfile
                ? "Update Profile"
                : "Save Profile"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}