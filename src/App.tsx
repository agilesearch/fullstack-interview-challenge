import Home from "./pages/Home";
import Final from "./pages/Final";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/final" element={<Final />} />
          <Route path="*" element={<div />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
