import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicLayout from "./layouts/PublicLayout";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
