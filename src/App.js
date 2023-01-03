import { Navbar } from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage, ProjectsPage, AboutPage, NotFoundPage, WipPage } from "./components/pages";
import { AnimatePresence } from "framer-motion";

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh'
  }
}

function App() {
  const location = useLocation()
  return (
    <div style={styles.app} className="App bg-neutral-focus">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/projects" element={<ProjectsPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/wip" element={<WipPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
