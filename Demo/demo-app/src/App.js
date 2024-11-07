import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import msalInstance from './msalConfig';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <ErrorBoundary>
          <div className="App">
            <aside className="App-sidebar">
              <h2>Dashboard</h2>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </aside>
            <main className="App-main">
              <header className="App-header">
                <h1>Welcome to the Dashboard</h1>
              </header>
              <section className="App-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </section>
            </main>
          </div>
        </ErrorBoundary>
      </Router>
    </MsalProvider>
  );
}

export default App;
