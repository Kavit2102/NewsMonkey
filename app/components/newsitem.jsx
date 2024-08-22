"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/theme_context";

export default function NewsItem(props) {
  const { Theme } = useContext(ThemeContext);
  let textColor, borderColor, shadowColor;
  const handleTextColor = async () => {
    // console.log(theme);
    textColor = Theme === "light" ? "text-black" : "text-white";
    shadowColor = Theme === "dark" ? "shadow-white" : "shadow-black";
    // setBorderColor(theme === "light" ? "border-black" : "border-white");
  };

  useEffect(() => {
    handleTextColor();
  }, [Theme]);

  return (
    <article
      className={`overflow-hidden relative z-0 flex flex-col items-center rounded-lg shadow-md ${shadowColor} ${textColor}`}
    >
      <div
        id="source"
        className="bg-success text-white w-fit pt-1 px-2 text-xs md:text-sm text-center absolute right-0 pb-2 rounded-bl-md rounded-tr-md"
      >
        {props.source}
      </div>
      {props.imageUrl ? (
        <Image
          src={props.imageUrl}
          unoptimized
          alt="Image Unavailable"
          className="h-56 w-full"
          height={224} // Adjust height as needed
          width={224} // Adjust width as needed
          loading="lazy"
          layout="responsive"
        />
      ) : (
        <div className="text-warning text-center text-sm md:text-base">
          Image Unavailable !!!!
        </div>
      )}

      <div className="p-4 sm:p-6">
        <h3 className="font-medium">
          <span>{props.title}</span>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm/relaxed">
          {props.description}.....
        </p>

        <Link
          href={props.newsUrl}
          target="_blank"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
