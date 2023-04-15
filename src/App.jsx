import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Note from "./pages/Note";
import Update from "./pages/Update";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
