import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// // Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyADxn12j-6yFws27EgRsoszz6ON2XQuhV4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAiText = async (Request) => {
  // console.log(typeof Request);
  try {
    const prompt = Request;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Server Error !!!",
    });
  }
};
