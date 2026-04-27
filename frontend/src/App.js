import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <Router>
      <Navbar />

      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/create" element={<CreateEvent />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
