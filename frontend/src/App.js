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
import ArchivedHabits from './pages/ArchivedHabits'
import HabitDetails from './pages/HabitDetails'
import StatisticDetails from './pages/StatisticDetails'
import HabitForm from './pages/HabitForm'
import PrivateRoute from './components/common/PrivateRoute'

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/myhabits" element={<MyHabits />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/mystatistics" element={<MyStatistics />} />
                    <Route path="/archivedhabits" element={<ArchivedHabits />} />
                    <Route path="/myhabits/details" element={<HabitDetails />} />
                    <Route path="/mystatistics/details" element={<StatisticDetails />} />
                    <Route path="/myhabits/form" element={<HabitForm />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
