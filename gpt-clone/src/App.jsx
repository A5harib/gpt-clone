import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Login from "./Login";
import Landing from "./Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
