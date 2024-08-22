"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

export const Profile = ({ textColor }) => {
  return (
    <>
      <div className={`${textColor} cursor-pointer`}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
