import { Navbar } from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage, ProjectsPage, AboutPage, NotFoundPage, WipPage } from "./components/pages";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getImages } from "./data/images";
import { LoadingPage } from "./components/pages/loadingPage";

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh'
  }
}

function App() {
  const [images, setImages] = useState([])
  const hasData = useRef(false)

  const fetchImages = async () => {
    hasData.current = true
    const x = await getImages()
    setImages(x)
  }

  const [doneLoading, setDoneLoading] = useState(false)

  useEffect(() => {
    if (!hasData.current) fetchImages()
  })

  const location = useLocation()
  const isLoading = !hasData.current || !doneLoading
  return (
    <div style={styles.app} className="App bg-neutral-focus">
      {!isLoading && <Navbar images={images} />}
      <AnimatePresence>
        {isLoading ?
          <LoadingPage key='loading' done={setDoneLoading} /> :
          <>
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<HomePage images={images} />} />
              <Route exact path="/projects" element={<ProjectsPage images={images} />} />
              <Route exact path="/about" element={<AboutPage images={images} />} />
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
