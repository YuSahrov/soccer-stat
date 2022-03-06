import './App.css';
import { Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import Layout from './components/Layout';
import League from "./pages/League";
import Teams from "./pages/Teams";
import Matche from './pages/matche';


function App() {
  return (
    <Container>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<League />} />
          <Route path="league" element={<League />} />
          <Route path="league/:leagueId" element={<Matche />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:teamId" element={<Matche />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
