import React from "react";

const NewsItem = (props) => {
  return (
    <div
      className={`border-1 border-${props.Border} rounded-md card w-full pb-3 flex flex-col gap-5 bg-${props.Theme} text-${props.Text}`}
    >
      <div
        id="source"
        className="bg-red-600 w-fit py-[2px] px-2 text-xs absolute right-0 text-white pb-2 rounded-bl-md rounded-tr-md"
      >
        {props.source}
      </div>
      <img src={props.imageUrl} className="rounded-sm" alt="NA" />
      <div className="px-4 flex flex-col gap-5">
        <p className="font-semibold">{props.title}</p>
        <p>{props.description}. . . . </p>
        <p className="text-sm">
          By {props.author} on {new Date(props.date).toGMTString()}
        </p>
        <button className="w-fit px-2 py-1 bg-purple-600 rounded-sm text-white">
          <a href={props.newsUrl}>Read here...</a>
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
