import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import LeaderboardTable from "./components/LeaderboardTable";
import AllRegistrations from "./pages/AllRegistrations";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventPage";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
  <Route path="/register" element={<RegisterPage />} />
   <Route path="/" element={<Home />} />
      <Route path="/Event" element={<EventsPage />} />

  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />   {/* ✅ updated */}
  <Route path="/leaderboard" element={<LeaderboardTable />} />
    <Route path="/admin/registrations" element={<AllRegistrations />} /> {/* ✅ new */}
</Routes>
</>
  );
}

export default App;
