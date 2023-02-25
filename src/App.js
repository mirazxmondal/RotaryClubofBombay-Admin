import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import Home from "./pages/Home";
import Data from "./pages/Data";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Data />} />
      </Routes>
    </Router>
  );
}

export default App;
