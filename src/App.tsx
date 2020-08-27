import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import AnimatedSwitch from './AnimatedSwitch'
function App() {
    return (
        <div className="App">
            <Router>
                <AnimatedSwitch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/about' component={About}></Route>
                </AnimatedSwitch>
            </Router>
        </div>
    );
}

export default App;
