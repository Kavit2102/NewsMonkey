"use client";
import { PrismaClient } from "@prisma/client";
import React, { useEffect, useState } from "react";
import BlogItem from "../components/blogItems";
import { fetchBlogs } from "@/prisma/prisma";
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/clerk-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const { isSignedIn } = useUser();

  useEffect(() => {
    fetchBlogs()
      .then((allBlogs) => {
        setBlogs(allBlogs);
      })
      .catch((error) => console.error(error));
  }, [blogs]);

  return (
    <div className="flex min-h-screen w-screen flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-12 items-center justify-center px-12 py-24">
      {blogs?.map((blog) => (
        <BlogItem
          key={blog.id}
          title={blog.title}
          description={blog.description}
          category={blog.category}
        />
      ))}
    </div>
  );
}
