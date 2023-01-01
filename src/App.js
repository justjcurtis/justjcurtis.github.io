import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { HomePage, ProjectsPage, AboutPage, ContactPage } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
