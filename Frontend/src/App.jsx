import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Navigate, Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ProblemPage from "./Pages/ProblemPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route
          path="/problem"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        ></Route>
      </Routes>

      <Toaster></Toaster>
    </>
  );
}

export default App;
