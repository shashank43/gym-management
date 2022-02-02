import React from "react";
import './App.css';
import ResponsiveDrawer from "./Components/Sidebar/ResponsiveDrawer";
import Home from "./Components/Home";
import Members from "./Components/Member/Members";
import Payments from "./Components/Payments";
import Analytics from "./Components/Analytics";
import Settings from "./Components/Settings";
import AddMember from "./Components/Member/AddMember";
import EditMember from "./Components/Member/EditMember";
import NewPayment from "./Components/NewPayment";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return <>
        <Router>
            <ResponsiveDrawer />
            <div className="main-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/add-member" element={<AddMember />} />
                <Route path="/edit-member/:_id" element={<EditMember />} />
                <Route path="/new-payment/:_id" element={<NewPayment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            </div>
       </Router>
    </>
}

export default App;