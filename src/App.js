import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar';
import Section from './components/Section';

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const stored = localStorage.getItem('TestingGit');

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('TestingGit');
    setUser(null);
  }
  const logo = '/assets/images/logo.png';
  return (
    <Router>
      <Sidebar userRole={user?.role} onLogout={handleLogout}/>
      <Section> 
        <Routes>
          <Route path="/" element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          }/>
        </Routes>
      </Section>
      
    </Router>
  );
}

export default App;
