import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
// import HomeScreen from "../pages/HomeScreen";
import LandIingScreen from "../pages/Landing/LandIingScreen";
import InstructionsPage from "../pages/screen/InstructionsPage";
import AssessmentPage from "../pages/screen/Assesment";
import ResultsPage from "../pages/screen/Results";
import SubmitPage from "../pages/screen/SubmitPage";


export const mainRoute = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <LandIingScreen/>,

      }
    ]
  },
  {
    path: "/instructions",
    element: <InstructionsPage/>
  },
  {
    path: "/assessment",
    element: <AssessmentPage/>
  },
  {
    path: "/results",
    element: <ResultsPage/>
  },
  {
    path: "/submit",
    element: <SubmitPage/>
  }
])