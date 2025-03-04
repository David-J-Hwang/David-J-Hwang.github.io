import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Blogs from "./pages/blogs/Blogs";
import Projects from "./pages/projects/Projects";
import GetWeather from "./pages/projects/GetWeather";
import Markdown from "./pages/blogs/Markdown";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/markdown" element={<Markdown />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/get-weather" element={<GetWeather />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
