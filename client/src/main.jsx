import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tours from "./pages/Tours";
import NewTour from "./pages/NewTour";
import EditTour from "./pages/EditTour";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/new" element={<NewTour />} />
      <Route path="/tours/edit" element={<EditTour />} />
    </Routes>
  </BrowserRouter>
);
