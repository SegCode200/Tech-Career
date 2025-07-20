import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
// import HomeScreen from "../pages/HomeScreen";
import LandIingScreen from "../pages/Landing/LandIingScreen";
import InstructionsPage from "../pages/screen/InstructionsPage";
import AssessmentPage from "../pages/screen/Assesment";
import ResultsPage from "../pages/screen/Results";
import SubmitPage from "../pages/screen/SubmitPage";
import NotFoundPage from "../pages/NotFoundPage";
import IntroPage from "../pages/IntroPage ";

export const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandIingScreen />,
      },
    ],
  },
  {
    path: "/instructions",
    element: <InstructionsPage />,
  },
  {
    path: "/intro",
    element: <IntroPage />,
  },
  {
    path: "/assessment",
    element: <AssessmentPage />,
  },
  {
    path: "/results/:token",
    element: <ResultsPage />,
  },
  {
    path: "/submit",
    element: <SubmitPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
