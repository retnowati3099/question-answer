import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Note from "./pages/Note";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note />} />
      </Routes>
    </Router>
  );
}

export default App;
