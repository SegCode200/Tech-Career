import { RouterProvider } from "react-router-dom"
import { mainRoute } from "./router/mainRoute"

const App = () => {
  return (
    <RouterProvider router={mainRoute}/>
  )
}

export default App