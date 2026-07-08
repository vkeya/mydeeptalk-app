export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "MyDeepTalk",
    url: "https://mydeeptalk.com",
    description:
      "Online therapy platform connecting clients with professional therapists.",
    areaServed: "Africa",
	serviceType: [
      "Online Therapy",
      "Relationship Counselling",
      "Mental Health Support",
      "Marriage Counselling",
    ],
  
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}