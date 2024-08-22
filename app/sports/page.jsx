import React from "react";
import News from "../components/news";

export default function Sports() {
  return (
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-3 gap-5 justify-between py-24 overflow-hidden">
      <News category="sports" apiKey={process.env.NEXT_PUBLIC_API_KEY} />
    </div>
  );
}
