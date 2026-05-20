import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/clerk-react";
import React from "react";
import { toast } from "react-hot-toast";

function HomePage() {
  return (
    <>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => toast.success("this is a success toast")}
        >
          Click Me
        </button>
        <SignedOut>
          <SignInButton mode="modal">
            <button>Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <SignOutButton>
            <button>Sign Out</button>
          </SignOutButton>
        </SignedIn>
      </div>
    </>
  );
}

export default HomePage;
