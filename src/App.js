import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import EditStudentPage from './pages/edit-student/edit-student'
import AddStudentPage from './pages/add-student/add-student'
import HomePage from './pages/home/home'

import './App.css';

function App() {
    return (
        <Router>
            <div className="nav-bar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/edit-students">Edit Student</Link></li>
                    <li><Link to="/add-students">Add Student</Link></li>
                </ul>
            </div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/edit-students" component={EditStudentPage}/>
            <Route path="/add-students" component={AddStudentPage} />
        </Router>
    );
}

export default App;
