"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";

const Header = () => {
  const { isLoading } = useStoreUser();

  return (
    <header
      className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-
    [backdrop-filter]:bg-white/60">
      <nav>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">Sign Up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>

      {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
  );
};

export default Header;
