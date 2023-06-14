import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Update from "./pages/Update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/note" element={<Note />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>
  );
}

export default App;
