import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import Data from "./pages/Data";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/Data" element={<Data />} />
      </Routes>
    </Router>
  );
}

export default App;
