import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyHabits from './pages/MyHabits'
import Profile from './pages/Profile'
import MyStatistics from './pages/MyStatistics'
import Home from './pages/Home'

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/myhabits" element={<MyHabits />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mystatistics" element={<MyStatistics />} />
            </Routes>
        </Router>
    );
}

export default App;
