import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Home } from "./page/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/recruteur/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
