import React from "react";
import News from "../components/news";

export default function Business() {
  return (
    <main className="flex flex-col min-h-screen w-full lg:grid lg:grid-cols-3 gap-5 justify-between py-24 overflow-hidden">
      <News category="business" apiKey={process.env.NEXT_PUBLIC_API_KEY} />
    </main>
  );
}
