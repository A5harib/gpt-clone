import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./screens/Login";
import Landing from "./screens/Landing";
import Registration from "./screens/Registration";
import Chat from "./screens/Chat";
//AIzaSyBkfbO6AV1KEqb0pnMM7r84_PqQv99iKtI
//AIzaSyAWpuLr805PYUAGRHBf71FIpqegoYz6pLw
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Registration />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
