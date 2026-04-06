import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nimto from "./pages/website/Nimto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<BaseLayout />}>
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/maps" element={<Shop />} />
        </Route> */}

        <Route path="/" element={<Nimto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
