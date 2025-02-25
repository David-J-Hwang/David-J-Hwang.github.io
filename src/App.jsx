import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Projects from './pages/Projects'
import Weather from "./components/Weather";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/projects/get-weather' element={<Weather />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;