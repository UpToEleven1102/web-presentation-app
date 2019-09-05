import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import EditStudentPage from './pages/edit-student/edit-student'
import AddStudentPage from './pages/add-student/add-student'
import HomePage from './pages/home/home'
import NavBar from './header/nav-bar/nav-bar'
import Footer from './footer/footer'

import './App.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Route exact path="/" component={HomePage}/>
            <Route path="/edit-students" component={EditStudentPage}/>
            <Route path="/add-students" component={AddStudentPage} />
            <Footer />
        </Router>
    );
}

export default App;
