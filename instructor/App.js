import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';

import Dashboard from './pages/Dashboard';
import Navigation from './components/common/Navigation';
import Categories from './pages/categories/Categories';
import NewCourse from './pages/courses/NewCourse';
import Reviews from './pages/reviews/Reviews';
import Users from './pages/users/Users';
import Settings from './pages/settings/Settings';
import Courses from './pages/courses/Courses';
import Applications from './pages/Applications/Applications';

import SignIn from './pages/SignIn';

export default function App({ isSignedIn, helloNEAR, wallet, web3StorageClient, graphClient }) {
    return (
        <div className="App">
            { 
            isSignedIn 
            ? (
                <Router>
                    <Navigation />
                    <Switch>
                        <PublicRoute path="/dashboard" component={Dashboard} exact />
                        <PublicRoute path="/categories" component={Categories} exact />
                        <PublicRoute path="/users" component={Users} exact />
                        <PublicRoute path="/reviews" component={Reviews} exact />
                        <PublicRoute path="/new-course" component={NewCourse} exact />
                        <PublicRoute path="/new-course?*" component={NewCourse} exact />
                        <PublicRoute path="/new-course/*" component={NewCourse} exact />
                        <PublicRoute path="/courses" component={Courses} exact />
                        <PublicRoute path="/settings" component={Settings} exact />
                        <PublicRoute path="/applications" component={Applications} exact />
                        <PublicRoute path="/edit-course/:slug" component={NewCourse} exact />
                        <PublicRoute path="/" component={SignIn}/>
                    </Switch>
                </Router>
            ) :
                <Router>
                    <PublicRoute path="/" component={SignIn}/>
                </Router>
            }
        </div>
    );
}
