"use client";
import { CreateBlog } from "@/prisma/prisma";
import { useUser } from "@clerk/nextjs";

export const BlogForm = () => {
  const { user, isSignedIn } = useUser();
  const handleSubmit = async (formData) => {
    // event.preventDefault();

    // console.log(formData);

    const userEmail = await user?.primaryEmailAddress.emailAddress;
    const userName = await user?.fullName;

    const newBlog = await {
      title: formData.get("title"),
      description: formData.get("description").trim(),
      category: formData.get("category"),
    };

    // console.log(newBlog); // Log the newBlog object to ensure fields are correctly populated

    await CreateBlog(newBlog, userEmail, userName);
  };
  return isSignedIn ? (
    <form
      className="form-control flex flex-col items-center gap-5 w-full"
      action={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        className="input input-bordered input-success w-full max-w-xs"
      />
      <textarea
        className="textarea textarea-accent w-full max-w-xs"
        name="description"
        required
        placeholder="Description"
      ></textarea>
      <input
        type="text"
        name="category"
        placeholder="Category"
        required
        className="input input-bordered input-success w-full max-w-xs"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={user?.fullName}
        disabled
        className="input input-bordered input-success w-full max-w-xs"
      />
      <button
        type="submit"
        className="bg-success p-2 text-white rounded-md"
        // onClick={handleSubmit}
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
