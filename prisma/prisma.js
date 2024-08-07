"use server";
import { useUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

export const CreateBlog = async (newBlog, userEmail, userName) => {
  const prisma = await new PrismaClient();
  try {
    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
        },
      });
    }
    // Create a blog for the user
    const createdBlog = await prisma.blog.create({
      data: {
        ...newBlog,
        authorId: user.id,
      },
    });

    console.log("User:", user);
    console.log("Blog:", createdBlog);
  } catch (error) {
    console.error("Error creating user and blog:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchBlogs = async () => {
  const prisma = await new PrismaClient();
  try {
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (error) {
    console.error("Error creating user and blog:", error);
  } finally {
    await prisma.$disconnect();
  }
};
