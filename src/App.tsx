import { RouterProvider } from "react-router-dom"
import { mainRoute } from "./router/mainRoute"
import { Provider } from "react-redux"
import { store } from "./store/index"
// import { store } from "./store/index"

const App = () => {
  return (
     <Provider store={store}>

    <RouterProvider router={mainRoute}/>
     </Provider>
  )
}

export default App