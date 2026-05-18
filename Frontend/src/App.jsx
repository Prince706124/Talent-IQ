import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome to our App</h1>
      <SignInButton mode="modal">
        <button className="text-white bg-color-blue">Get Started</button>
      </SignInButton>
    </>
  );
}

export default App;
