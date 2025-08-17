import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Slots from './pages/Slots';
import Vehicles from './pages/Vehicles';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/checkin" element={<Checkin />} />
<Route path="/" element={<Dashboard />} />
<Route path="/dashboard" element={<Dashboard />} /> 



      </Routes>
    </Router>
  );
}

export default App;
