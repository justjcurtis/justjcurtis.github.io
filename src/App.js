import { Navbar } from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage, ProjectsPage, AboutPage, NotFoundPage, WipPage } from "./components/pages";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LoadingPage } from "./components/pages/loadingPage";
import { useImageUrls } from "./hooks/useImageUrls";

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh'
  }
}

function App() {
  const images = useImageUrls()
  const location = useLocation()

  const [doneLoading, setDoneLoading] = useState(false)

  const isLoading = !images || !doneLoading

  return (
    <div style={styles.app} className="App bg-neutral-focus">
      {!isLoading && <Navbar images={images} />}
      <AnimatePresence>
        {isLoading ?
          <LoadingPage key='loading' done={setDoneLoading} /> :
          <>
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/projects" element={<ProjectsPage />} />
              <Route exact path="/about" element={<AboutPage />} />
              <Route exact path="/wip" element={<WipPage />} />
              <Route path='/*' element={<NotFoundPage />} />
            </Routes>
          </>
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
