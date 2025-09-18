import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Page from "./pages/Page";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-900 text-white flex gap-4">
        <Link to="/">Logs</Link>
        <Link to="/pago1">/pago1</Link>
        <Link to="/pago2">/pago2</Link>
        <Link to="/pago3">/pago3</Link>
        <Link to="/pago4">/pago4</Link>
      </nav>
      <a href="/">LOGS</a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pago1" element={<Page path="/pago1" />} />
        <Route path="/pago2" element={<Page path="/pago2" />} />
        <Route path="/pago3" element={<Page path="/pago3" />} />
        <Route path="/pago4" element={<Page path="/pago4" />} />
      </Routes>
    </Router>
  );
}
