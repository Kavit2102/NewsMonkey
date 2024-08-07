"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

export const Profile = ({ textColor }) => {
  return (
    <>
      <SignedOut>
        <div className="btn btn-accent text-white cursor-pointer">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
