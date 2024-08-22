"use client";
import { CreateBlog } from "@/prisma/prisma";
import { SignIn, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Flip, toast } from "react-toastify";

export const BlogForm = () => {
  const { user, isSignedIn } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (formData) => {
    const userEmail = await user?.primaryEmailAddress?.emailAddress;
    const userName = await user?.fullName;

    const newBlog = await {
      title: formData.get("title"),
      description: formData.get("description").trim(),
      category: formData.get("category"),
    };

    try {
      const response = await CreateBlog(newBlog, userEmail, userName);
      alert(response.status);
    } catch (error) {
      alert(error);
    }
  };

  const handleAiText = async () => {
    try {
      const prompt = title;

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setDescription(text);
      toast.success("Successfully fetched !!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    } catch (error) {
      toast.error("Server Error Occured !!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  return isSignedIn ? (
    <form
      className="form-control flex flex-col items-center gap-5 w-full"
      action={handleFormSubmit}
    >
      <div className="flex flex-col md:flex-row w-full gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="input input-bordered input-success w-full max-w-none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAiText}
        >
          Generate AI Blog
        </button>
      </div>
      <textarea
        value={description}
        className="textarea textarea-accent w-full max-w-none"
        name="description"
        required
        placeholder="Description"
        rows={10}
      ></textarea>
      <input
        type="text"
        name="category"
        placeholder="Category"
        required
        className="input input-bordered input-success w-full max-w-none"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={user?.fullName}
        disabled
        className="input input-bordered input-success w-full max-w-none"
      />
      <button
        type="submit"
        className="bg-success p-2 text-white rounded-md"
        onClick={handleFormSubmit}
      >
        Create Blog
      </button>
    </form>
  ) : (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
};
