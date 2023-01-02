import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import { HomePage, ProjectsPage, AboutPage, NotFoundPage, WipPage } from "./components/pages";

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100vh'
  }
}

function App() {
  return (
    <div style={styles.app} className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/projects" element={<ProjectsPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/wip" element={<WipPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
