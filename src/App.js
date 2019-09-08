import React, {Component, useState, Fragment} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import PresentationPage from './pages/presentation/presentation'
import AddStudentPage from './pages/add-student/add-student'
import ScoringPage from "./pages/scoring/scoring";
import HomePage from './pages/home/home'
import NavBar from './header/nav-bar/nav-bar'
import Footer from './footer/footer'

import './App.css';


function App() {
    const [user , setUser ] = useState(null)
    return (
        <Router>
            <NavBar user={user} />
            <Route exact path="/" component={HomePage}/>
            <Route path="/presentation" component={PresentationPage}/>
            <Route path="/add-students" component={AddStudentPage} />
            <Route path="/scoring" component={() => <ScoringPage user={user} />} />
            <Footer />
        </Router>
    );
}

export default App;
