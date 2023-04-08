import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Home } from "./pages/Home";
import { store } from "./store/store";

export default function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}
