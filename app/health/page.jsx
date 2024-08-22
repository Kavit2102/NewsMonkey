import React from "react";
import News from "../components/news";

export default function Health() {
  return (
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-3 gap-5 justify-between py-24 overflow-hidden">
      <News category="health" apiKey={process.env.NEXT_PUBLIC_API_KEY} />
    </div>
  );
}
