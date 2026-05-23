import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import ProblemsPage from "./Pages/ProblemsPage";
import SessionPage from "./Pages/SessionPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />}
        ></Route>
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        ></Route>
      </Routes>

      <Toaster></Toaster>
    </>
  );
}

export default App;
